import React from 'react';
import BodyReports from '../components/ReportsPage/BodyReports/BodyReportsComponent';
import NavBar from '../components/NavBar/index';
class ReportsPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar title="Reports" canBack />
        <BodyReports />
      </div>
    );
  }
}

export default ReportsPage;
