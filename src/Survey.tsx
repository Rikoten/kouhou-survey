import React from 'react'
import { DownloadButton } from './DownloadButton'
import { ParsedExcel } from './types'

export const Survey: React.FunctionComponent<{
    parsedExcels: ParsedExcel[]
}> = ({ parsedExcels }) => {
    return <div>
        <BeforeConvertChecklist />
        <DownloadButton
            text={ JSON.stringify(parsedExcels.map(it => it.parsedData)) }
            filename='data.json'
            disabled={ parsedExcels.length === 0 }
        />
        <SurveyPreview parsedExcels={ parsedExcels } />
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

const SurveyPreview: React.FunctionComponent<{
    parsedExcels: ParsedExcel[]
}> = ({ parsedExcels }) => {
    return <div className='Preview'>
        <pre><code>{ JSON.stringify(parsedExcels.map(it => it.parsedData), null, 2) }</code></pre>
    </div>
}
