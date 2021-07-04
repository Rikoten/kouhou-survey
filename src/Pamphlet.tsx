import React from 'react'
import { ParsedExcel } from './types'

const pamphletKeys = [
    '号館',
    '教室名',
    '団体番号',
    '団体名',
    '企画名',
    'パンフレットサムネイル',
    'アプリサムネイル',
    '企画のセクション',
    '年齢層',
    '見出しのフレーズ',
    'パンフレット本文',
    'Webサイト企画文章',
    'Webサイト団体文章',
    'アプリ企画検索機能',
    'アピールタイム'
]

const pamphletMap: Map<typeof pamphletKeys[number], string[]> = new Map([
    [ '団体番号', [ '表紙', '企画ID' ] ],
    [ '団体名', [ '表紙', '団体名' ] ],
    [ 'アプリ企画検索機能', [ 'パンフレットアプリ', 'タグ' ] ],
    [ '企画アピールタイム', [ 'アピールタイム（任意）', '原稿'] ],
])

function getNested(keys: string[], object: unknown): unknown {
    let data = object
    for (const key of keys) {
        if (!data) return undefined
        data = (data as any)[key]
    }
    return data
}

function convertSelectToArray(flatObject: { [key: string]: string }): string[] {
    const entries = Object.entries(flatObject)
    return entries.map(([ key, value ]) => {
        if (value === '◯') return key
        return undefined
    }).filter(it => {
        return typeof it !== 'undefined'
    }) as string[]
}

export const Pamphlet: React.FunctionComponent<{
    parsedExcels: ParsedExcel[]
}> = ({ parsedExcels }) => {
    const csvData = []

    const data: { [key: string]: string} = {}
    const keys = Array.from(pamphletMap.keys())
    for (const key of keys) {
        const jsonKeys = pamphletMap.get(key) as string[]
        const data = getNested(keys, parsedExcel)
    }

    return <div>
        Hello, world!
    </div>
}
