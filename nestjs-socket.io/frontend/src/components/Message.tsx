import React from 'react';

export type MessageProps = {
    id: string;
    content: string;
    replyToId?: string;
    sentAt: Date;
    sentById: string;
    align: 'left' | 'right';
}

export const Message = (props: MessageProps) => {
    let classNames = 'message';
    classNames += props.align === 'left' ? ' align-left' : ' align-right';
    const tooltipId = `participant-${props.sentById}`;

    return (
        <div className={classNames} data-tooltip-id={tooltipId}>{props.content}</div>
    );
};
