import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect, useDispatch } from "react-redux";
import { loadProducts } from "../src/redux/actions/product";
import { blue, grey, categories } from "../utils/helpers";
import { fetchProductsByGroceryList } from "../utils/api";

const ProductCategory = (props) => {
  const dispatch = useDispatch();
  const groceryListID = props.route.params.groceryList.id;
  const { products } = props;
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
      const data = await fetchProductsByGroceryList(groceryListID)
      data ? dispatch(loadProducts(data)) : dispatch(loadProducts([]));
  }

  function goToProductList(category) {
    return props.navigation.push("ProductList", { category, groceryListID });
  }
  function productCountPerCat(category) {
    return products.filter(product => product.category === category).length
  }

  function productCheckedCountPerCat(category) {
    return products.filter(product => product.category === category && product.checked === true).length
  }
  function showCategories() {
    return (
      <View style={styles.container}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            onPress={() => goToProductList(cat.name)}
            style={styles.vignetteItem}
            key={index}
          >
            <MaterialCommunityIcons name={cat.img} size={100} color={grey} />
            <Text style={styles.text}> {cat.name.toUpperCase()} <Text style={styles.innerText}>{productCheckedCountPerCat(cat.name)}/{productCountPerCat(cat.name)}</Text></Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View>
      {Platform.OS === "default" ? (
        <View>{showCategories()}</View>
      ) : (
        <ScrollView>{showCategories()}</ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductCategory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    flexDirection: "row",
    padding: 8,
    flexWrap: "wrap",
  },
  vignetteItem: {
    alignItems: "center",
    width: 150,
    height: 150,
    margin: 10,
  },
  button: {
    marginVertical: 10,
    margin: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  innerText : {
  color: blue
  }
});
