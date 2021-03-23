import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { parse } from 'structured-xlsx-parser'

import './index.html'

import './style.scss'

type ExcelFile = {
    filename: string
    data: Uint8Array
}

type ParsedExcel = {
    filename: string,
    parsedData: unknown
}

const App = () => {
    const [ excelFiles, setExcelFiles ] = useState<ExcelFile[]>([])
    const [ parsedExcel, setParsedExcel ] = useState<ParsedExcel[]>([])

    useEffect(() => {
        try {
            const parsed = excelFiles.map(it => ({
                filename: it.filename,
                parsedData: parse(it.data)
            }))
            const sortedFilenames = parsed.map(it => it.filename).sort()
            const sortedItems = sortedFilenames.map(filename => parsed.find(item => item.filename == filename)) as ParsedExcel[]
            setParsedExcel(sortedItems)
        } catch (err) {
            alert('リロードしてね\n' + err)
        }
    }, [ excelFiles ])

    return <div className='App'>
        <div className='Left'>
            <h1>理工展連絡会 広報物調査変換ツール</h1>
            <FileDragArea setExcelFiles={ setExcelFiles }/>
            <UploadedFileList parsedExcel={ parsedExcel } />
        </div>
        <div className='Right'>
            <BeforeConvertChecklist />
            <DownloadButton parsedExcel={ parsedExcel } />
            <Preview parsedExcel={ parsedExcel } />
        </div>
    </div>
}

const FileDragArea: React.FunctionComponent<{
    setExcelFiles: (excelFiles: ExcelFile[]) => unknown
}> = ({ setExcelFiles }) => {
    const onDropHandler: React.DragEventHandler = async e => {
        e.preventDefault()
        const excelFiles: ExcelFile[] = await Promise.all(Array.from(e.dataTransfer.files).map(async it => ({
            filename: it.name,
            data: new Uint8Array(await it.arrayBuffer())
        })))
        setExcelFiles(excelFiles)
    }

    const preventDefaultHandler: React.DragEventHandler = e => {
        e.preventDefault()
    }

    return <div className='FileDragArea' onDrop={ onDropHandler } onDragOver={ preventDefaultHandler }>
        広報物調査をまとめてドラッグアンドドロップ
    </div>
}

const UploadedFileList: React.FunctionComponent<{
    parsedExcel: ParsedExcel[]
}> = ({ parsedExcel }) => {
    return <div className='UploadedFileList'>
        <h2>追加済みのファイル ({ parsedExcel.length } 件追加済み)</h2>
        <ul>{
            parsedExcel.map(it => <li>{ it.filename }</li>)
        }</ul>
    </div>
}

const BeforeConvertChecklist = () => <div className='BeforeConvertChecklist'>
    <h2>変換する前に...</h2>
    <ul>
        <li>広報物調査の Excel ファイルは書き換えましたか？</li>
        <li>すべての Excel ファイルが追加されていますか？</li>
        <li>変換結果が露骨に壊れていませんか？</li>
    </ul>
</div>

const DownloadButton: React.FunctionComponent<{
    parsedExcel: ParsedExcel[]
}> = ({ parsedExcel }) => {
    const downloadText = 'data:,' + JSON.stringify(parsedExcel.map(it => it.parsedData))
    const disabled = parsedExcel.length === 0
    const onClickHandler: React.MouseEventHandler = e => {
        if (disabled) e.preventDefault()
    }
    return <div className='DownloadButton'>
        <a download='data.json' href={ downloadText } data-disabled={ disabled } onClick={ onClickHandler }>変換してダウンロード</a>
    </div>
}

const Preview: React.FunctionComponent<{
    parsedExcel: ParsedExcel[]
}> = ({ parsedExcel }) => {
    return <div className='Preview'>
        <pre><code>{ JSON.stringify(parsedExcel.map(it => it.parsedData), null, 2) }</code></pre>
    </div>
}

render(<App />, document.getElementById('app'))
