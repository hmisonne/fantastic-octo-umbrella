import * as React from "react";
import { List } from "react-native-paper";
import SwipeList from "./SwipeList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RowData } from "../src/types/ListElements";

interface Props {
  sectionTitle: string;
  sectionIcon: string;
  rowData: RowData[],
  deleteAction: () => void;
  navigateToEdit: () => void;
  onPressAction: () => void;
  toBuyView: boolean;
}

const ListAccordion: React.FC<Props> = ({
  sectionTitle,
  sectionIcon,
  rowData,
  deleteAction,
  navigateToEdit,
  onPressAction,
  toBuyView,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const checkedItemPerCat = rowData.filter(data => data.checked === true)
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      title={toBuyView ? `${sectionTitle} (${checkedItemPerCat.length}/${rowData.length})` : sectionTitle}
      theme={{
        colors: {
          primary: "black",
        },
      }}
      style={{ padding: 0, paddingLeft: 10, margin: 0 }}
      left={(props) => <MaterialCommunityIcons {...props} name={sectionIcon} size={20} />}
      expanded={expanded}
      onPress={handlePress}
    >
      <SwipeList
        productListView={true}
        listData={rowData}
        deleteAction={deleteAction}
        navigateToEdit={navigateToEdit}
        onPressAction={onPressAction}
        toBuyView={toBuyView}
      />
    </List.Accordion>
  );
};

export default ListAccordion;