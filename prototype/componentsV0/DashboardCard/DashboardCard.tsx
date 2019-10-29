import React, { Component, ReactNode } from "react";

import Card from "@material-ui/core/Card";

import { DashboardCardItem } from "./DashboardCardItem";
import {
  DashboardCardModeContextProps,
  DashboardCardModeProvider,
} from "./DashboardCardModeContext";
import {
  DashboardCardPagination,
  DashboardCardPaginationProps,
} from "./DashboardCardPagination";
import { DashboardCardPaginationHeaderToolbar } from "./DashboardCardPaginationHeaderToolbar";
import {
  DashboardCardTable,
  DashboardCardTableProps,
} from "./DashboardCardTable";
import {
  DashboardCardTitleToolbar,
  DashboardCardTitleToolbarProps,
} from "./DashboardCardTitleToolbar";

export interface DashboardCardProps
  extends Pick<
      DashboardCardModeContextProps,
      "onItemEditClick" | "onRequestDeleteClick"
    >,
    Pick<
      DashboardCardTitleToolbarProps,
      "editCaptionText" | "additionalActionNode"
    >,
    Pick<DashboardCardTableProps, "columnLabels" | "columnTypes"> {
  /**
   * Card title. If not provided, no title toolbar is displayed.
   */
  title?: string;

  /**
   * A node to render to the right of the card title.
   */
  titleSiblingNode?: ReactNode;

  /**
   * Data list items.
   */
  items: DashboardCardItem[];

  /**
   * Optional pagination options. When left undefined, no pagination control is
   * shown.
   */
  paginationProps?: DashboardCardPaginationProps;

  /**
   * Required if "paginationProps" is provided. The word describing the type of
   * items in the table, eg. "question". It will be pluralized automatically.
   */
  paginationListItemType?: string;
}

export class DashboardCard extends Component<DashboardCardProps> {
  render() {
    const {
      title,
      titleSiblingNode,
      items,
      onItemEditClick,
      onRequestDeleteClick,
      editCaptionText,
      columnLabels,
      columnTypes,
      paginationProps,
      paginationListItemType,
      additionalActionNode,
    } = this.props;
    const itemKeys = items.map(item => item.key);

    const paginationNode = paginationProps ? (
      <DashboardCardPagination {...paginationProps} />
    ) : (
      undefined
    );

    return (
      <DashboardCardModeProvider
        itemKeys={itemKeys}
        onItemEditClick={onItemEditClick}
        onRequestDeleteClick={onRequestDeleteClick}
      >
        <Card>
          {title && (
            <DashboardCardTitleToolbar
              title={title}
              titleSiblingNode={titleSiblingNode}
              editCaptionText={editCaptionText}
              showEditButton={Boolean(onItemEditClick)}
              showDeletionButton={Boolean(onRequestDeleteClick)}
              additionalActionNode={additionalActionNode}
            />
          )}

          {paginationProps && (
            <DashboardCardPaginationHeaderToolbar
              {...paginationProps}
              listItemType={paginationListItemType!}
            />
          )}

          <DashboardCardTable
            showCheckboxes={Boolean(onRequestDeleteClick)}
            columnLabels={columnLabels}
            columnTypes={columnTypes}
            items={items}
            bottomPaginationNode={paginationNode}
          />
        </Card>
      </DashboardCardModeProvider>
    );
  }
}
