import type { MenuDataItem } from '@ant-design/pro-layout';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from 'umi';
import { Link, SelectLang, useIntl, connect, FormattedMessage} from 'umi';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>商家联盟卡后台</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.desc"
                defaultMessage="信用买单，边享边付"
              />
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright={`2020 - ${new Date().getFullYear()} 会盟科技`}
          links={[
            {
              key: 'Huaxiaoyi',
              title: '花小易运营中心官网',
              href: 'https://www.hmviplus.com/',
              blankTarget: true,
            }
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
