import React, { useEffect, useState } from 'react'
import { encode } from 'iconv-lite'
import { DownloadButton } from './DownloadButton'
import { ParsedExcel } from './types'

const pamphletKeys = [
    '号館',
    '教室名',
    '団体番号',
    '団体名',
    '企画名',
    'パンフレット本文',
    'アピールタイム'
]

const pamphletMap: Map<typeof pamphletKeys[number], string[]> = new Map([
    [ '団体番号', [ '表紙', '企画ID' ] ],
    [ '団体名', [ '表紙', '団体名' ] ],
    [ '企画名', [ '表紙', '企画名' ] ],
    [ 'パンフレット本文', [ '企画紹介', '企画紹介文'] ],
    [ 'アピールタイム', [ 'アピールタイム（任意）', '原稿' ] ]
])

function getNested(keys: string[], object: unknown): unknown {
    let data = object
    for (const key of keys) {
        if (!data) return undefined
        data = (data as any)[key]
    }
    return data
}

export const Pamphlet: React.FunctionComponent<{
    parsedExcels: ParsedExcel[]
}> = ({ parsedExcels }) => {
    const csvData: string[][] = [ [ ...pamphletKeys ] ]

    const keys = Array.from(pamphletMap.keys())
    for (const data of parsedExcels.map(it => it.parsedData)) {
        const csvRow: string[] = [ '', '' ]
        for (const key of keys) {
            const jsonKeys = pamphletMap.get(key) as string[]
            const value = getNested(jsonKeys, data) as string

            const escaped = value.includes(',') ? '"' + value.replace(/"/g, '""') + '"' : value

            csvRow.push(escaped)
        }
        csvData.push(csvRow)
    }

    const [ csv, setCsv ] = useState(new Uint8Array())
    useEffect(() => {
        const csv = csvData.map(row => row.join(',')).join('\r\n')
        setCsv(encode(csv, 'Shift_JIS'))
    }, [ JSON.stringify(csvData) ])

    return <div>
        <DownloadButton
            filename='pamphlet.csv'
            file={ csv }
            text='パンフレット用 CSV をダウンロード'
            disabled={ parsedExcels.length === 0 }
        />
    </div>
}
