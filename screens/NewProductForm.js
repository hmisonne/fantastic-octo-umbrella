import React, { useState } from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import reducers from '../src/redux/reducers';
import { addProduct } from '../src/redux/actions/product'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, Product } from '../src/models'
import {Picker} from '@react-native-community/picker';
import SubmitBtn from '../components/SubmitBtn'
import StyledTextInput from '../components/StyledTextInput'
import Stepper from '../components/Stepper'
import { grey } from '../utils/colors'
import UnitPicker from '../components/UnitPicker'

const initialState = { 
  name: '',
  checked: false,
  unit: 'ct', 
  quantity: 1, 
  category: '',
  productGroceryListId: '123'
}

const units = ['ct', 'lb', 'g', 'kg', 'L']

const NewProductForm = (props) => {
  initialState.category = props.route.params.category
  const [formState, setFormState] = useState(initialState)
  // const [state, dispatch] = useReducer(reducers);
  const dispatch = useDispatch()

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  
  function onIncrement(key) {
    const count = parseInt(formState[key], 10) + 1
    setFormState({ ...formState, [key]: count })
  }

  function onDecrement(key) {
    const count = parseInt(formState[key], 10) - 1
    setFormState({ ...formState, [key]: count })
  }

  async function addProductHandler() {    
    try {
      const product = { ...formState }
      // setProducts([...products, product])
      setFormState(initialState)
      // Retrieve List object
      const listId ='918fd14f-ccd8-42d7-8b37-89ce265df990'
      const currentList = await DataStore.query(GroceryList, listId);
      // Convert Quantity to Int
      product.quantity = parseInt(product.quantity, 10)
      // Add reference
      product.groceryList = currentList

      const productSaved = await DataStore.save(
        new Product(product)
      )

      await DataStore.save(
        GroceryList.copyOf(currentList, updated => {
          updated.products = updated.products ?
           [...updated.products, productSaved]
          : [productSaved]
    }))

      dispatch(addProduct(productSaved))
      props.navigation.goBack();
      console.log("Product saved successfully!");
    } catch (err) {
      console.log('error creating food:', err)
    }
  }


  return (
    <View style={styles.container}>
      <StyledTextInput
          onChangeText={val => setInput('name', val)}

          value={formState.name} 
          placeholder="Name"
        />
        <View style={styles.product}>
          <Stepper
            onIncrement={() => onIncrement('quantity')} 
            onDecrement={() => onDecrement('quantity')} 
          />
          <StyledTextInput
          onChangeText={val => setInput('quantity', val)}
          keyboardType="numeric"

          value={`${formState.quantity}`}
          placeholder="quantity"
          />
        </View>
        

        <UnitPicker
          selectedValue={formState.unit}
          onValueChange={val => setInput('unit', val)}
          label={formState.unit}
          value={formState.unit}
          units={units}
        />
        <SubmitBtn title="Add to List" onPress={addProductHandler} />
      </View>
  )

}


export default NewProductForm


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-around', 
    padding: 20 
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  product: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15 
  },
  productName: { fontSize: 18 },
  picker: {
    height: 40,
    borderColor: grey,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
},
})

// updated.products = (updated.products)?
// [...updated.products, productSaved]
// : [productSaved]