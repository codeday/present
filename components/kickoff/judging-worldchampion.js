import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Slide } from '../screen';
import { Title, Large } from '../screen/text';

const FeaturedText = styled.span`
  text-decoration: underline;
`;

const AwardBlock = styled.div`
  text-align: center;

  ${Large} {
    font-size: 4vh;
    display: block;
    padding-top: 4vh;
  }

  div {
    padding: 3vh 2vh;
    vertical-align: top;
    text-align: center;
    display: inline-block;
    font-size: 4vh;
  }

  img {
    max-width: 13vw;
  }
`;

const RainbowKeyframes = keyframes`
  0%{background-position:0% 90%}
  50%{background-position:100% 11%}
  100%{background-position:0% 90%}
`;

const RainbowSlide = styled(Slide)`
  animation: ${RainbowKeyframes} 20s ease infinite;
  background: linear-gradient(318deg, #ff8900, #1ed74e, #00b9ff, #ff0000);
  background-size: 800% 800%;
  color: white;
`;


const modifiers = [
  'Creative Concept',
  'Art',
  'Music',
  'Writing',
  'Community Choice',
];

export default () => (
  <RainbowSlide>
    <AwardBlock>
      <Title>
        World Champion Awards
      </Title>
      {modifiers.map((m) => (
        <div>
          <img
            src="https://images.ctfassets.net/d5pti1xheuyu/3TqDnmhjKa4p4ln0DJwT1C/672166943a9a5b1acdd8bda7ad4fb70a/AwardSticker_World_Champion.png"
            alt="World Champion"
          /><br />
          {m}
        </div>
      ))}
      <Large>Based exclusively on <FeaturedText>creativity</FeaturedText> - judged by <FeaturedText>professional artists</FeaturedText></Large>
    </AwardBlock>
  </RainbowSlide>
);
