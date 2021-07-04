import React from 'react'
import { DownloadButton } from './DownloadButton'
import { Pamphlet } from './Pamphlet'
import { ParsedExcel } from './types'

export const Survey: React.FunctionComponent<{
    parsedExcels: ParsedExcel[]
}> = ({ parsedExcels }) => {
    return <div>
        <DownloadButton
            file={ JSON.stringify(parsedExcels.map(it => it.parsedData)) }
            filename='data.json'
            disabled={ parsedExcels.length === 0 }
            text='JSON をダウンロード'
        />
        <Pamphlet parsedExcels={ parsedExcels } />
        <SurveyPreview parsedExcels={ parsedExcels } />
    </div>
}

const SurveyPreview: React.FunctionComponent<{
    parsedExcels: ParsedExcel[]
}> = ({ parsedExcels }) => {
    return <div className='Preview'>
        <pre><code>{ JSON.stringify(parsedExcels.map(it => it.parsedData), null, 2) }</code></pre>
    </div>
}
