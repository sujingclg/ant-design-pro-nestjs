import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export interface LinkType {
  key: string;
  title: string | React.ReactNode;
  href: string;
  isBlankTarget?: boolean;
}

export interface GlobalFooterProps {
  className?: string;
  copyright?: React.ReactNode;
  links?: LinkType[];
}

const GlobalFooter: React.FC<GlobalFooterProps> = (props => {
  const {className, links, copyright} = props;
  const clsString = classNames(styles.globalFooter, props.className);
  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.isBlankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
});

export default GlobalFooter;
