import { LayoutProps } from './layout.d';
import { Breadcrumb } from 'antd';
import styles from './layout.module.css';
import { useMemo } from 'react';

const Layout = ({ pageTitle, breadCrumb, children }: LayoutProps) => {
  const isEmptyBreadCrumb = useMemo(() => {
    return breadCrumb?.length === 0;
  }, []);
  return (
    <div className={styles['container']}>
      <header className="container-header">
        {!isEmptyBreadCrumb && <Breadcrumb items={breadCrumb} />}
        <h1 className="heading heading--lg">{pageTitle}</h1>
      </header>

      <main className="container__content">{children}</main>
    </div>
  );
};

export default Layout;
