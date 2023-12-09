/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slide from '../screen/slide';
import Text, { Large, Title } from '../screen/text';

const BgImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 0;
  opacity: ${({ display }) => display ? '100' : '0'};
  transition: opacity 1.5s ease-in-out;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url("${({ src }) => src}");
`;

const ThemeTextOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  text-align: center;
  padding-top: 30vh;
  background: radial-gradient(
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0.8)
  );
  ${Large}, ${Text}, ${Title} {
    color: #fff;
    display: block;
  }
  ${Title} {
    font-size: 10vh;
    margin-top: 4vh;
  }
`;


export default class Theme extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  state = {
    visibleThemeIndex: 0,
  }

  componentDidMount() {
    setInterval(
      () => {
        const { event } = this.props;
        const { visibleThemeIndex } = this.state;
        this.setState({ visibleThemeIndex: (visibleThemeIndex+1) % event.themeImages.length});
      },
      3000,
    );
  }


  render() {
    console.log(this.props);
    const { visibleThemeIndex } = this.state;
    const { event } = this.props;
    const { theme, themeImages } = event;

    const visibleThemeImage = themeImages[visibleThemeIndex];

    return (
      <Slide padding={0} bg="#000">
        {themeImages.map(src => (
          <BgImage src={src} display={visibleThemeImage === src} />
        ))}
        <ThemeTextOverlay>
          <Large>Project Theme:</Large>
          <Title>&ldquo;{theme}&rdquo;</Title>
          <Text>(You're not required to fit the theme, but it's a bonus.)</Text>
        </ThemeTextOverlay>
      </Slide>
    )
  }

}
