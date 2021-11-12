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
  Conduct,
  Schedule,
  Sponsors,
  Pitches,
  Theme,
  CustomSlide,
  Covid,
  Explainer,
  Showcase,
} from '../../../../components/kickoff';

export default withRouter(class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    globalSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
    communityPartners: PropTypes.arrayOf(PropTypes.object).isRequired,
    config: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    const [event, globalSponsors] = await Promise.all([
      Srnd.getEventInfo(router.query.event),
      Srnd.getGlobalSponsors(),
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
      communityPartners,
      additionalSlides,
    } = this.props;

    return (
      <div>
        <Head>
          <title>{`${event.name} Kickoff`}</title>
        </Head>
        <Deck event={event} config={config} globalSponsors={globalSponsors} communityPartners={communityPartners}>
          <Title />
          {event.kickoffVideo ? <Video /> : null}
          {globalSponsors && globalSponsors.filter((s) => s.audio).length > 0 ? <VideoSponsors /> : null }
          <Sponsors />
          <CreateCode />
          {event.theme ? <Theme /> : null}
          <Explainer />
          <Judging />
          <Conduct />
          <Covid />
          <Schedule />
          { additionalSlides ? additionalSlides.map(slide => <CustomSlide content={slide} />) : null }
          <Showcase />
          <Pitches />
        </Deck>
      </div>
    );
  }
});
