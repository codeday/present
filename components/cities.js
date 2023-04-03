import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const CityDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ff686b;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.5);
    padding: 30px;
    cursor: pointer;
    transition: filter 0.2s ease-in-out;

    &:hover {
        filter: brightness(1.2);
    }

    &:active {
        filter: brightness(0.8);
    }
`;

export default class Cities extends React.Component {
    static propTypes = {
        href: PropTypes.string.isRequired,
        city_event: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { href, city_event } = this.props;

        return (
            <CityDiv onClick={()=> {window.location = href}}>
                <h3> {city_event.name} </h3>
            </CityDiv>
        );
    }
}
