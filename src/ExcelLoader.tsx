import React, { useState, useEffect } from 'react'
import { ParsedExcel } from './types'

type ExcelFile = {
    filename: string
    data: Uint8Array
}

export const ExcelLoader: React.FunctionComponent<{
    parsedExcels: ParsedExcel[],
    setParsedExcels: (parsedExcels: ParsedExcel[]) => unknown,
}> = ({ parsedExcels, setParsedExcels }) => {
    const [ excelFiles, setExcelFiles ] = useState<ExcelFile[]>([])
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (excelFiles.length == 0) {
            setParsedExcels([])
            return
        }
        setLoading(true)
        const parsed: ParsedExcel[] = []
        let workerNum = 0
        for (let i = 0; i < excelFiles.length; i += 5) {
            const worker = new Worker('./worker.js')
            worker.postMessage(excelFiles.slice(i, i + 5))
            workerNum += 1

            worker.addEventListener('message', (e) => {
                worker.terminate()
                workerNum -= 1
                setLoading(false)
                const [ err, data ] = e.data
                if (err) {
                    alert('リロードしてね\n' + err)
                    return
                }
                parsed.push(...data)

                if (workerNum == 0) {
                    console.log('parse finish')
                    setParsedExcels(parsed)
                }
            })
        }

    }, [ excelFiles ])

    return <div>
        <FileDragArea setExcelFiles={ setExcelFiles } loading={ loading } />
        <UploadedFileList parsedExcel={ parsedExcels } />
    </div>
}

const FileDragArea: React.FunctionComponent<{
    setExcelFiles: (excelFiles: ExcelFile[]) => unknown,
    loading: boolean
}> = ({ setExcelFiles, loading }) => {
    const [ dragging, setDragging ] = useState(false)

    const onDropHandler: React.DragEventHandler = async e => {
        e.preventDefault()
        setDragging(false)
        const excelFiles: ExcelFile[] = await Promise.all(Array.from(e.dataTransfer.files).map(async it => ({
            filename: it.name,
            data: new Uint8Array(await it.arrayBuffer())
        })))
        setExcelFiles(excelFiles)
    }

    const onDragOverHandler: React.DragEventHandler = e => {
        e.preventDefault()
        setDragging(true)
    }

    const onDragLeaveHandler: React.DragEventHandler = () => {
        setDragging(false)
    }

    return <div
        className={ 'FileDragArea' + (dragging ? ' drag' : '')}
        onDrop={ onDropHandler }
        onDragOver={ onDragOverHandler }
        onDragLeave={ onDragLeaveHandler }
    >
        { loading ? '変換中...' : '広報物調査をまとめてドラッグ・ドロップ' }
    </div>
}

const UploadedFileList: React.FunctionComponent<{
    parsedExcel: ParsedExcel[]
}> = ({ parsedExcel }) => {
    return <div className='UploadedFileList'>
        <h2>追加済みのファイル ({ parsedExcel.length } 件追加済み)</h2>
        <ul>{
            parsedExcel.map(it => <li key={it.filename}>{ it.filename }</li>)
        }</ul>
    </div>
}
