import React from 'react';
import BodyReports from '../components/ReportsPage/BodyReports/BodyReportsComponent';
import NavBarReporting from '../components/ReportsPage/NavBar/NavComponentent';

class ReportsPage extends React.Component {
  render() {
    return (
      <div>
        <NavBarReporting />
        <BodyReports />
      </div>
    );
  }
}

export default ReportsPage;
