import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { ChartRenderer } from './ChartRenderer';
import { TableRenderer } from './TableRenderer';

const MessageTypes = {
  TEXT: 'text',
  CHART: 'chart',
  TABLE: 'table',
  IMAGE: 'image'
};

export function MessageContent({ content, type, styles }) {
  switch (type) {
    case MessageTypes.CHART:
      return <ChartRenderer data={content.data} type={content.chartType} />;
    case MessageTypes.TABLE:
      return <TableRenderer data={content.data} />;
    case MessageTypes.IMAGE:
      return (
        <img 
          src={content.url} 
          alt={content.alt || 'Chat image'} 
          loading="lazy"
          className="max-w-full rounded-lg"
        />
      );
    case MessageTypes.TEXT:
    default:
      return (
        <ReactMarkdown 
          remarkPlugins={[gfm]} 
          className={styles.markdownanswer}
          linkTarget="_blank"
        >
          {content}
        </ReactMarkdown>
      );
  }
}
