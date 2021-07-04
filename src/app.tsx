import React, { useState } from 'react'
import { render } from 'react-dom'

import { Survey } from './Survey'
import { ExcelLoader } from './ExcelLoader'
import { Pamphlet } from './Pamphlet'

import { ParsedExcel } from './types'

import './index.html'
import './style.scss'

const App = () => {
    const [ parsedExcels, setParsedExcels ] = useState<ParsedExcel[]>([])

    return <div className='App'>
        <div className='Left'>
            <h1>理工展連絡会 広報物調査変換ツール</h1>
            <ExcelLoader
                parsedExcels={ parsedExcels }
                setParsedExcels={ setParsedExcels }
            />
        </div>
        <div className='Right'>
            <Survey parsedExcels={ parsedExcels } />
            <Pamphlet parsedExcels={ parsedExcels } />
        </div>
        <HelpButton />
    </div>
}

const HelpButton = () => <a href='https://github.com/Rikoten/kouhou-survey/blob/main/README.md' target='_blank' className='HelpButton'>
    ?
</a>

render(<App />, document.getElementById('app'))
