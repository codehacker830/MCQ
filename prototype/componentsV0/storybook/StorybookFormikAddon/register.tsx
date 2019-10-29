// TODO: Fix type:
// @ts-ignore
import addons, { AddonsApi } from "@storybook/addons";
import { EventEmitter } from "events";
import React, { Component } from "react";

import { Panel } from "./Panel";

type Props = {
  channel: EventEmitter;
  api: AddonsApi;
  active: boolean;
};

type State = {
  formikState: object | null;
};

class PanelController extends Component<Props, State> {
  state: State = { formikState: null };

  componentDidMount() {
    const { channel, api } = this.props;

    channel.on("FORMIK/update_state", this.handleFormikStateUpdate);

    api.onStory(() => {
      this.handleFormikStateUpdate(null);
    });
  }

  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener("FORMIK/update_state", this.handleFormikStateUpdate);
  }

  render() {
    const { active } = this.props;
    const { formikState } = this.state;

    if (!active) return null;

    return <Panel state={formikState} />;
  }

  private handleFormikStateUpdate = (formikState: object | null) => {
    this.setState({ formikState });
  };
}

addons.register("FORMIK", api => {
  addons.addPanel("FORMIK/panel", {
    title: "State",
    render: ({ active }) => (
      <PanelController
        // TODO: Fix type:
        // @ts-ignore
        channel={addons.getChannel()}
        api={api}
        active={active}
      />
    ),
  });
});
