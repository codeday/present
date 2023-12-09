import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import markdown from 'markdown-it';
import Srnd from '../../../../server/srndApi';
import { parseCode } from '../../../../components/settings';
import Deck from '../../../../components/screen/deck';
import {
  Title,
  Video,
  VideoSponsors,
  CreateCode,
  Judging,
  JudgingWorldChampion,
  Conduct,
  Schedule,
  Sponsors,
  Pitches,
  Theme,
  CustomSlide,
  Explainer,
  Showcase,
  WhatsNext,
  BadProjects,
  GoodProjects,
} from '../../../../components/kickoff';

export default withRouter(class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    globalSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
    communityPartners: PropTypes.arrayOf(PropTypes.object).isRequired,
    config: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    const [event, globalSponsors, pastProjects] = await Promise.all([
      Srnd.getEventInfo(router.query.event),
      Srnd.getGlobalSponsors(),
      Srnd.getPastProjects(),
    ]);
    const communityPartners = await Srnd.getCommunityPartners(event);
    const config = parseCode(router.query.config);
    const additionalSlides = config.additionalSlides ? config.additionalSlides
      .split("\n----\n")
      .map((md) => markdown().render(md))
      : null;

    return {
      event,
      globalSponsors,
      pastProjects,
      communityPartners,
      config,
      additionalSlides,
    };
  }

  render() {
    const {
      event,
      config,
      globalSponsors,
      pastProjects,
      communityPartners,
      additionalSlides,
    } = this.props;
    return (
      <div>
        <Head>
          <title>{`${event.name} Kickoff`}</title>
        </Head>
        <Deck event={event} config={config} pastProjects={pastProjects} globalSponsors={globalSponsors} communityPartners={communityPartners}>
          <Title />
          {event.kickoffVideo ? <Video /> : null}
          {globalSponsors && globalSponsors.filter((s) => s.audio).length > 0 ? <VideoSponsors /> : null }
          <Sponsors />
          <Explainer />
          <CreateCode />
          <Judging />
          <JudgingWorldChampion />
          {event.theme ? <Theme /> : null}
          <BadProjects />
          {pastProjects && <GoodProjects />}
          <Conduct />
          <Schedule />
          { additionalSlides ? additionalSlides.map(slide => <CustomSlide content={slide} />) : null }
          <Showcase />
          <Pitches />
          <WhatsNext />
        </Deck>
      </div>
    );
  }
});
