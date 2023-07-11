import { Col, Layout, Row, Typography } from 'antd';
import FooterBarStyle from '../../../styles/layout/FooterBarStyle';

//const VERSION = process.env.REACT_APP_VERSION;

const FooterBar = () => (
  <FooterBarStyle>
    <Layout.Footer className="footerBar">
      <Row justify="start">
        <Col>
        <Typography.Text style={{color: "white", display: "flex", justifyContent: "center", alignItems: "baseline", fontSize:"9px"}}>
                    Copyright © 2023&nbsp;<span className="logo" style={{fontSize:"10px", letterSpacing:"0"}}>Apoorva R</span>. All Rights Reserved.
                </Typography.Text>
        </Col>
      </Row>
    </Layout.Footer>
  </FooterBarStyle>
);

export default FooterBar;
