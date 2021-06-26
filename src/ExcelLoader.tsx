import React, { useState, useEffect } from 'react'
import { parse } from 'structured-xlsx-parser'
import { ParsedExcel } from './types'

type ExcelFile = {
    filename: string
    data: Uint8Array
}

export const ExcelLoader: React.FunctionComponent<{
    parsedExcels: ParsedExcel[],
    setParsedExcels: (parsedExcels: ParsedExcel[]) => unknown
}> = ({ parsedExcels, setParsedExcels }) => {
    const [ excelFiles, setExcelFiles ] = useState<ExcelFile[]>([])

    useEffect(() => {
        try {
            const parsed = excelFiles.map(it => ({
                filename: it.filename,
                parsedData: parse(it.data, it.filename)
            }))
            const sortedFilenames = parsed.map(it => it.filename).sort()
            const sortedItems = sortedFilenames.map(filename => parsed.find(item => item.filename == filename)) as ParsedExcel[]
            setParsedExcels(sortedItems)
        } catch (err) {
            alert('リロードしてね\n' + err)
        }
    }, [ excelFiles ])

    return <div>
        <FileDragArea setExcelFiles={ setExcelFiles }/>
        <UploadedFileList parsedExcel={ parsedExcels } />
    </div>
}

const FileDragArea: React.FunctionComponent<{
    setExcelFiles: (excelFiles: ExcelFile[]) => unknown
}> = ({ setExcelFiles }) => {
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
        広報物調査をまとめてドラッグ・ドロップ
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
