import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    Button,
    TextInput,
  } from 'react-native';
  import React from 'react';
  import BouncyCheckbox from 'react-native-bouncy-checkbox';
  
  import AsyncStorage from '@react-native-community/async-storage';
  
  
  export default function App() {
    const [data, setData] = React.useState([]);
    const [fakeData, setFakeData] = React.useState([]);
    const [text, setText] = React.useState('');
    const saveList = async () => {
      try {
        await AsyncStorage.setItem('list', JSON.stringify(data));
        console.log('List saved');
      } catch (e) {
        // saving error
        console.log('Saving error');
      }
    };
    const Item = ({name, id}) => {
      const isCheched = fakeData.includes(id);
      return (
        <View style={{marginTop: 10, marginLeft: 10}}>
          <View style={styles.textbox} onPress={() => console.log('Pressed!')}>
            <Text style={styles.text}>{name} </Text>
            <Text style={styles.text}>{id} </Text>
            <BouncyCheckbox
              isChecked={isCheched}
              onPress={() => handleCheck(id)}
              fillColor="black"
            />
          </View>
        </View>
      );
    };
  
    const PostData = () => {
  
      return (
        <FlatList
          data={data}
          renderItem={({item}) => fakeData.includes(item.id) ? <Item name={item.name} id={item.id} /> : null}
          keyExtractor={item => item.id}
        />
      );
    };
  
    const handleCheck = id => {
      const index = fakeData.indexOf(id);
      console.log('Index :' + index);
      if (index === -1) {
        const newSelectedItems = [...fakeData, id];
        setFakeData(newSelectedItems);
      } else {
        const newData = [...fakeData];
        newData.splice(index, 1);
        setFakeData(newData);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>List of peoples ! </Text>
        <FlatList
          data={data}
          renderItem={({item}) => <Item name={item.name} id={item.id} />}
          keyExtractor={item => item.id}
        />
        <TextInput
          style={styles.textbox2}
          placeholder="Enter name"
          onChangeText={text => setText(text)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            title="Ekle !"
            onPress={() => {
              setData([...data, {name: text, id: Math.random()}]);
            }}
          />
          <Button title="Listeyi Temizle !  " onPress={() => setData([])} />
          <Button title="Listeyi Kaydet !  " onPress={() => saveList()} />
        </View>
  
        <View style={{height: 2, backgroundColor: 'black'}} />
        {/* <PostData />    */}
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 50,
    },
    textbox: {
      backgroundColor: 'pink',
      width: '80%',
      height: 'auto',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textbox2: {
      backgroundColor: '#FFBFA9',
      width: '90%',
      height: 50,
      padding: 10,
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      alignSelf: 'center',
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
    },
  });
  