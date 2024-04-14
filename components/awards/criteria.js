import React from 'react';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title, Large } from '../screen/text';

const FeaturedText = styled.span`
  color: #ff686b;
  text-decoration: underline;
`;

export default () => (
  <Slide>
    <Title>Time for awards!</Title>
    {/* <Title>Here&apos;s how our judges decided... (in order of importance)<br /><br /></Title>
    <Large block>1. <FeaturedText>Difficulty.</FeaturedText> Did you really push yourself?</Large>
    <Large block>2. <FeaturedText>Creativity.</FeaturedText> Have we seen this a thousand times?</Large>
    <Large block>3. <FeaturedText>Polish.</FeaturedText> Anything else?</Large> */}
    <Title>Here's how <FeaturedText>you</FeaturedText> voted</Title>
  </Slide>
);
