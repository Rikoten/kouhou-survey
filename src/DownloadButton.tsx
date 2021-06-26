import React from 'react'

export const DownloadButton: React.FunctionComponent<{
    disabled?: boolean,
    text: string,
    filename: string
}> = ({ text, filename, disabled }) => {
    const downloadText = 'data:,' + text
    const onClickHandler: React.MouseEventHandler = e => {
        if (disabled) e.preventDefault()
    }
    return <div className='DownloadButton'>
        <a download={ filename } href={ downloadText } data-disabled={ disabled } onClick={ onClickHandler }>変換してダウンロード</a>
    </div>
}
