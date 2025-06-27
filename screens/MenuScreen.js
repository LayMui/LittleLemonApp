import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  ActivityIndicator,
} from 'react-native';

const Separator = () => <View style={menuStyles.separator} />;

const Footer = () => (
  <Text style={menuStyles.footerText}>
    All Rights Reserved by Little Lemon 2022
  </Text>
);

const Item = ({ name, price }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
    <Text style={menuStyles.itemText}>{`$${price}`}</Text>
  </View>
);

const MenuScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState([]);

  const groupByCategory = (items) => {
    const grouped = items.reduce((acc, item) => {
      const categoryTitle = item.category?.title || 'Uncategorized';
      if (!acc[categoryTitle]) {
        acc[categoryTitle] = [];
      }
      acc[categoryTitle].push({
        title: item.title,
        price: item.price,
        id: item.id,
      });
      return acc;
    }, {});
  
    // Convert to array of sections
    return Object.entries(grouped).map(([title, data]) => ({
      title,
      data,
    }));
  };

  
  const getMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json'
      );
      const json = await response.json();


      console.log('Menu JSON:', json.menu);




         // Group flat menu items by category for SectionList
    const sections = groupByCategory(json.menu);

    setMenuData(sections);

    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const renderItem = ({ item }) => (
    <Item name={item.title} price={item.price} />
  );
  const renderSectionHeader = ({ section }) => (
    <Text style={menuStyles.sectionHeader}>{section.title}</Text>
  );
  

  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText}>Little Lemon</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#495E57" />
      ) : (
        <SectionList
          keyExtractor={(item, index) => item.title + index}
          sections={menuData}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ListFooterComponent={Footer}
          ItemSeparatorComponent={Separator}
        />
      )}
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#495E57',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 16,
  },
  innerContainer: {
    flexDirection: 'row',      // arrange children horizontally
    justifyContent: 'space-between', // push name to left, price to right
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#333333',
  },
  itemText: {
    color: '#F4CE14',
    fontSize: 18,
  },
  sectionHeader: {
    backgroundColor: '#fbdabb',
    color: '#333333',
    fontSize: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#EDEFEE',
  },
  footerText: {
    color: '#EDEFEE',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#495E57',
  },
});

export default MenuScreen;
