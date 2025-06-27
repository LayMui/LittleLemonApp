import { useEffect, useState } from 'react';
import {SafeAreaView,StyleSheet,View,TextInput,Text,TouchableOpacity,} from 'react-native';
import {IconButton,Provider,Portal,Dialog,Button,} from 'react-native-paper';
import AsyncAlert from '../utils/asyncAlert';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('little_lemon.db', '1.0', '', 1);

const CustomerScreen = ({ navigation }) => {  
    const [textInputValue, setTextInputValue] = useState('');
    const [dialog, setDialog] = useState({
        customer: {},
        isVisible: false,
    });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'create table if not exists customers (id integer primary key not null, uid text, name text);',
                    [],
                    () => console.log('Table created successfully'),
                    (_, error) => console.log('Error creating table:', error)
                );
                tx.executeSql(
                    'select * from customers', 
                    [], 
                    (_, { rows }) => {
                        const customers = rows._array.map((item) => ({
                            uid: item.uid,
                            name: item.name,
                        }));
                        setCustomers(customers);
                        console.log('Customers loaded:', customers);
                    },
                    (_, error) => console.log('Error loading customers:', error)
                );
            },
            (error) => console.log('Transaction error:', error),
            () => console.log('Database initialized successfully')
        );
    }, []);

    const showDialog = (customer) =>
        setDialog({
            isVisible: true,
            customer,
        });

    const hideDialog = (updatedCustomer) => {
        setDialog({
            isVisible: false,
            customer: {},
        });
        
        const newCustomers = customers.map((customer) => {
            if (customer.uid !== updatedCustomer.uid) {
                return customer;
            }
            return updatedCustomer;
        });
        
        setCustomers(newCustomers);
        
        // Edit customer from DB - Fixed SQL injection vulnerability
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'update customers set uid=?, name=? where uid=?',
                    [updatedCustomer.uid, updatedCustomer.name, updatedCustomer.uid],
                    () => console.log('Customer updated successfully'),
                    (_, error) => console.log('Error updating customer:', error)
                );
            },
            (error) => console.log('Update transaction error:', error)
        );
    };

    const deleteCustomer = async (customer) => {
        const shouldDelete = await asyncAlert({
            title: 'Delete customer',
            message: `Are you sure you want to delete the customer named "${customer.name}"?`,
        });
        
        if (!shouldDelete) {
            return;
        }
        
        const newCustomers = customers.filter((c) => c.uid !== customer.uid);
        setCustomers(newCustomers);
        
        // SQL transaction to delete item based on uid
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'delete from customers where uid = ?', 
                    [customer.uid],
                    () => console.log('Customer deleted successfully'),
                    (_, error) => console.log('Error deleting customer:', error)
                );
            },
            (error) => console.log('Delete transaction error:', error)
        );
    };

    const addCustomer = () => {
        if (!textInputValue.trim()) {
            return;
        }

        const newValue = {
            uid: Date.now().toString(),
            name: textInputValue.trim(),
        };
        
        setCustomers([...customers, newValue]);
        
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'insert into customers (uid, name) values(?, ?)',
                    [newValue.uid, newValue.name],
                    () => console.log('Customer added successfully'),
                    (_, error) => console.log('Error adding customer:', error)
                );
            },
            (error) => console.log('Insert transaction error:', error)
        );
        
        setTextInputValue('');
    };

    return (
        <Provider>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>Little Lemon Customers</Text>
                    <TextInput
                        placeholder="Enter the customer name"
                        value={textInputValue}
                        onChangeText={(data) => setTextInputValue(data)}
                        underlineColorAndroid="transparent"
                        style={styles.textInputStyle}
                    />
                    <TouchableOpacity
                        disabled={!textInputValue.trim()}
                        onPress={addCustomer}
                        style={[
                            styles.buttonStyle,
                            !textInputValue.trim() && styles.buttonDisabled
                        ]}
                    >
                        <Text style={styles.buttonTextStyle}>Save Customer</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.customerName}>
                            Customers ({customers.length}):
                        </Text>
                        {customers.map((customer) => (
                            <View key={customer.uid} style={styles.customer}>
                                <Text style={styles.customerName}>{customer.name}</Text>
                                <View style={styles.icons}>
                                    <IconButton
                                        icon="pen"
                                        size={24}
                                        onPress={() => showDialog(customer)}
                                    />
                                    <IconButton
                                        icon="delete"
                                        size={24}
                                        onPress={() => deleteCustomer(customer)}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <Portal>
                    <Dialog visible={dialog.isVisible} onDismiss={() => hideDialog(dialog.customer)}>
                        <Dialog.Title>Edit Customer name</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                value={dialog.customer.name || ''}
                                onChangeText={(text) =>
                                    setDialog((prev) => ({
                                        ...prev,
                                        customer: {
                                            ...prev.customer,
                                            name: text,
                                        },
                                    }))
                                }
                                underlineColorAndroid="transparent"
                                style={styles.textInputStyle}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => hideDialog(dialog.customer)}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    customer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    customerName: {
        fontSize: 18,
    },
    buttonStyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        marginTop: 32,
        minWidth: 250,
        marginBottom: 16,
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonTextStyle: {
        padding: 5,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    textInputStyle: {
        textAlign: 'center',
        height: 40,
        fontSize: 18,
        width: '100%',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    icons: {
        flexDirection: 'row',
    },
});

export default CustomerScreen;