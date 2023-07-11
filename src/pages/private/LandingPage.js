import { Layout } from 'antd';
import TopBar from '../../component/common/layout/TopBar';
import ContentBody from '../../component/common/layout/ContentBody';
import FooterBar from '../../component/common/layout/FooterBar';
import ContentBodyStyle from '../../styles/layout/ContentBodyStyle';

const LandingPage = () => (
  <Layout hasSider={false}>
    <TopBar />
    <ContentBodyStyle><br/><br/><br/><br/><br/>
    {/* <MenuBar /> */}
    <ContentBody />
    </ContentBodyStyle>
    <FooterBar />
  </Layout>
);

export default LandingPage;
