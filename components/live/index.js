import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import styled from "styled-components";
import { Slide } from "../screen";
import { Title } from "../screen/text";
import Schedule from "./schedule";
import NowPlaying from "../now-playing";
import Social from "./social";
import OBS from "./obs";

const leftWidth = 30;

const ScheduleBox = styled.div`
  background-color: #ff686b;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 23vh;
  overflow: hidden;
  width: ${leftWidth}vw;
  padding: 3vh 3vw;
  box-sizing: border-box;

  &:before {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4vw;
    background-image: linear-gradient(
      to right,
      rgba(255, 104, 107, 0),
      rgba(255, 104, 107, 1)
    );
  }

  &:after {
    content: "";
    display: block;
    height: 15vh;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(
      rgba(255, 104, 107, 0),
      rgba(255, 104, 107, 1)
    );
  }
`;

const RadioBox = styled.div`
  position: absolute;
  background-color: #ff686b;
  left: 0;
  bottom: 0;
  height: 23vh;
  width: ${leftWidth}vw;
  padding: 5vh 3vw 3vh 3vw;
  box-sizing: border-box;
`;

const SocialBox = styled.div`
  position: absolute;
  left: ${leftWidth}vw;
  background-color: #fff;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 1vw;
  box-sizing: border-box;
  overflow: hidden;
`;

export default class Live extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { event, config } = this.props;
    if (typeof window === "undefined") return null;

    return (
      <Slide padding="0">
        <Head>
          <link
            rel="stylesheet"
            href="https://f1.codeday.org/fonts/gosha-sans/all.css"
          />
        </Head>
        <ScheduleBox>
          <Schedule event={event} config={config} />
        </ScheduleBox>
        <RadioBox>{config.radio && <NowPlaying align="left" />}</RadioBox>
        <SocialBox>
          <OBS/>
        </SocialBox>
      </Slide>
    );
  }
}
