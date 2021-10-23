import React, { useRef } from 'react'
import { DownloadButton } from './DownloadButton'
import { ParsedExcel } from './types'

export const Survey: React.FunctionComponent<{
    parsedExcels: ParsedExcel[]
}> = ({ parsedExcels }) => {
    return <div>
        <DownloadButton
            file={ JSON.stringify(parsedExcels.map(it => it.parsedData)) }
            filename='data.json'
            disabled={ parsedExcels.length === 0 }
            text='JSON をクリックしてダウンロード'
        />
        <SurveyPreview parsedExcels={ parsedExcels } />
    </div>
}

const SurveyPreview: React.FunctionComponent<{
    parsedExcels: ParsedExcel[],
}> = ({ parsedExcels }) => {
    const ref = useRef<HTMLElement>(null)
    const onClick = () => {
        getSelection()?.selectAllChildren(ref.current!!)
        document.execCommand('copy')
        console.log(parsedExcels.length)
    }
    return <div className='Preview' onClick={ onClick }>
        <pre><code ref={ ref }>{ JSON.stringify(parsedExcels.map(it => it.parsedData)) }</code></pre>
    </div>
}
