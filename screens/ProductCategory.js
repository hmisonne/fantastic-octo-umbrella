import * as React from 'react';

import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import {sortedCategories, productCategory, mainColor } from "../utils/helpers";


const ProductCategory = ({navigation, route}) => {
    const { category, updateCategory } = route.params
    const [categorySelected, setCategorySelected] = React.useState(category);

    ;
    return (
        <ScrollView>
        {sortedCategories.map(catID => 
            <TouchableOpacity 
                style = {categorySelected == productCategory[catID].name ? styles.backgroundRow : styles.notSelected}
                onPress = {() => {
                    setCategorySelected(catID)
                    updateCategory(catID) 
                    navigation.goBack()
                }}
                key = {catID}>
                <List.Item
                    title={productCategory[catID].name}
                    left={props => <List.Icon {...props} icon={productCategory[catID].picture} />}
                />
            </TouchableOpacity>
        )}
        </ScrollView>
        
    )
}

export default ProductCategory;

const styles = StyleSheet.create({
    backgroundRow: {
      backgroundColor: mainColor,
    },
    notSelected: {
        backgroundColor: '#F1F1F0',
    }
  });
  
