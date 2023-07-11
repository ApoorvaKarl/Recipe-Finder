import { Layout } from 'antd';
import ContentBodyStyle from '../../../styles/layout/ContentBodyStyle';
import HomePage from '../../Recipe/HomePage';
import Profile from '../../../Profile';
import { useLocation } from 'react-router-dom';

const ContentBody = () => {
  const location = useLocation();

  return (
    <ContentBodyStyle>
      <Layout.Content>
        <HomePage />
      </Layout.Content>
    </ContentBodyStyle>
  );
};

export default ContentBody;

