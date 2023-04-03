import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Srnd from '../server/srndApi';
import Cities from '../components/cities';
import styled from 'styled-components';

const CityContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default class Index extends React.Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    return {
      events: await Srnd.getAllEvents(),
    };
  }

  render() {
    const { events } = this.props;

    return (
      <div>
        <h1>CodeDay Present</h1>
        <p>Pick a city...</p>
        <CityContainer>
          {events.map((event, index) => (
            <Cities key={index} href={`/e/${event.id}`} city_event={event} />
          ))}
        </CityContainer>
      </div>
    );
  }
}
