import { action } from "@storybook/addon-actions";
import { array } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import {
  DashboardCardModeConsumer,
  DashboardCardModeProvider,
} from "./DashboardCardModeContext";

storiesOf("Components V0", module)
  .addParameters({ info: { propTablesExclude: [DashboardCardModeConsumer] } })
  .add("DashboardCardModeProvider", () => {
    const itemKeys = array(
      "Items",
      Array.from({ length: 10 }, (_item, index) => `Item ${index + 1}`),
    );

    return (
      <div>
        <DashboardCardModeProvider
          itemKeys={itemKeys}
          onItemEditClick={action("onItemEditClick")}
          onRequestDeleteClick={action("onRequestDeleteClick")}
        >
          <DashboardCardModeConsumer>
            {api => (
              <>
                <p>Edit Mode: {api.state.mode}</p>
                {api.state.mode === "display" ? (
                  <>
                    <button onClick={api.actions.enterEditMode}>
                      Enter Edit Mode
                    </button>
                    <button onClick={api.actions.enterDeletionMode}>
                      Enter Deletion Mode
                    </button>
                  </>
                ) : (
                  <button onClick={api.actions.exitMode}>Exit Mode</button>
                )}
                {api.state.mode === "deletion" && (
                  <button
                    onClick={api.actions.requestDelete}
                    disabled={api.actions.getSelectedCount() === 0}
                  >
                    Delete Items
                  </button>
                )}

                <ul>
                  {/* Table Header */}
                  <li onClick={api.actions.toggleSelectAll}>
                    {api.state.mode === "deletion" && (
                      <>
                        <strong>
                          {api.actions.getIsIndeterminate()
                            ? "[-]"
                            : api.actions.getIsAllSelected()
                            ? "[*]"
                            : "[ ]"}
                          &nbsp;
                        </strong>
                        Selected Count: {api.actions.getSelectedCount()}
                      </>
                    )
                    //
                    }
                  </li>

                  {itemKeys.map((key, index) => (
                    <li key={key} onClick={() => api.actions.clickItem(key)}>
                      {api.state.mode === "deletion" && (
                        <strong style={{ marginRight: 8 }}>
                          [{api.state.selected[index] ? "*" : " "}]
                        </strong>
                      )}
                      {key}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </DashboardCardModeConsumer>
        </DashboardCardModeProvider>
      </div>
    );
  });
