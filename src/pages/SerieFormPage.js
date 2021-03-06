import React from "react";
import { StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Picker, 
    Slider, 
    Button, 
    ScrollView, 
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert
} from "react-native";

import { connect } from "react-redux";

import FormRow from '../components/FormRow';
import { setField, saveSerie, setWholeSerie, resetForm } from "../actions";

class SerieFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        const { navigation, setWholeSerie, resetForm } = this.props;
        const { params } = navigation.state;
        if (params && params.serieToEdit) {
            setWholeSerie(params.serieToEdit);
        } else {
            resetForm();
        }
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        } 
        return (
            <Button
                title="Salvar"
                onPress={async () => {
                    this.setState({ isLoading: true })
                    try {
                        const { saveSerie, serieForm, navigation } = this.props;
                        await saveSerie(serieForm);   
                        navigation.goBack();
                    } catch (error) {
                        Alert.alert('Ops.. Erro :(', error.message)
                    } finally {
                        this.setState({ isLoading: false })
                    }
                }} />
            );
    }

    render() {
        const { serieForm, setField, saveSerie, navigation } = this.props;

        return (
            <KeyboardAvoidingView 
                behavior='padding' 
                enabled
                keyboardVerticalOffset={150}>
                <ScrollView>
                    <FormRow first>
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            value={serieForm.title}
                            onChangeText={value => setField('title', value)}
                        />
                    </FormRow> 
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="URL da imagem"
                            value={serieForm.img}
                            onChangeText={value => setField('img', value)}
                        />
                    </FormRow>
                    <FormRow>
                        <Picker
                            selectedValue={serieForm.gender}
                            onValueChange={itemValue => setField('gender', itemValue)}>
                            <Picker.Item label="Policial" value="Policial" />
                            <Picker.Item label="Comédia" value="Comédia" />
                            <Picker.Item label="Terror" value="Terror" />
                        </Picker>
                    </FormRow>
        
                    <FormRow>
                        <View style={styles.sameRow}>
                            <Text>Nota:</Text>
                            <Text>{serieForm.rate}</Text>
                        </View>
                        <Slider 
                            onValueChange={value => setField('rate', value)}
                            value={serieForm.rate}
                            minimumValue={0}
                            maximumValue={100}
                            step={5} />
                    </FormRow>
        
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            value={serieForm.description}
                            onChangeText={value => setField('description', value)}
                            numberOfLines={4}
                            multiline={true}
                        />
                    </FormRow>
                    { this.renderButton() }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
} 

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    picker: { 
        height: 50, 
        width: 100 
    },
    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
});

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}
const mapDispatchToProps = {
    setField,
    saveSerie,
    setWholeSerie,
    resetForm,
}
{/* <SerieFormPage  
    serieForm={state.serieForm}
    setField={(field, value) => dispatch(setField(field, value))} /> */}
export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);