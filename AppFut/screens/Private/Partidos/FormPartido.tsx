import React, { memo } from "react";
import { Image, TouchableOpacity, ScrollView, View, Platform } from "react-native";
import {
    TopNavigation,
    StyleService,
    useStyleSheet,
    Input,
    Button,
    Icon,
    Layout,
    Datepicker
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Text from "../../../components/Text";
import Content from "../../../components/Content";
import Container from "../../../components/Container";
import { Images } from "../../../assets/images";
import ButtonText from "../../../components/ButtonText";
//import { SignIn01_Data } from "./SignIn01";
import useLayout from "../../../hoooks/useLayout";
import BottomTab from "../Component/BottomTab";

const FormPartido = () => {
    // const navigation = useNavigation();

    type AppParamList = {
        HomePage: undefined;
    };

    const { navigate, goBack } = useNavigation<NavigationProp<AppParamList>>();
    const { bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);
    const [date, setDate] = React.useState(new Date());


    return (
        <Container style={styles.container}>
            <TopNavigation
                accessoryLeft={() => (
                    <TouchableOpacity >
                        <Image
                            /*  source={Images.futbol}*/
                            /* @ts-ignore */
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            />
            <Content style={styles.content}>
                <Text category="header">
                    Agregar Partido
                </Text>
                <Input
                    placeholder="Arbitro"
                    status="primary"
                    style={styles.input}
                />

                <Input
                    placeholder="Equipo Local"
                    status="primary"
                    style={styles.input}
                />

                <Input
                    placeholder="Equipo Visita"
                    status="primary"
                    style={styles.input}
                />

                <View style={styles.buttons}>
                    <Datepicker
                        style={styles.inputFecha}
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                    />

                    <Input
                        placeholder="Hora"
                        status="primary"
                        style={styles.inputFecha}
                    />

                </View>
                <View style={styles.buttons}>
                    <Input
                        placeholder="Goles Local"
                        status="primary"
                        style={styles.inputEquipo}
                    />

                    <Input
                        placeholder="Goles Visita"
                        status="primary"
                        style={styles.inputEquipo}
                    />
                </View>

                <Input
                    placeholder="Observaciones"
                    status="primary"
                    style={styles.input}
                />

                <View style={styles.buttons}>
                    <Button
                        children="Cancelar"
                        style={styles.buttonsLiga}
                        status='danger'
                    />
                    <Button status='success' style={styles.buttonsLiga} children="Guardar" onPress={() => navigate("HomePage")} />
                </View>

                <ScrollView
                    scrollEnabled={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.btnImage, { paddingBottom: bottom + 24, justifyContent: 'center' }]}
                >
                </ScrollView>
            </Content>
            <BottomTab selectIndex={4} />
        </Container>
    );
};


export default FormPartido;



const themedStyles = StyleService.create({
    container: {
        flex: 1,
    },
    equipos: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    icon: {
        width: 98,
        height: 98,
        marginLeft: 40,
    },
    buttons: {
        marginTop: 24,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },

    buttonsLiga: {
        margin: 20,
        width: 150,
    },
    iconArrow: {
        tintColor: "color-primary-100",
        marginRight: 8,
    },
    input: {
        marginVertical: 24,
    },
    inputEquipo: {
        width: 160,
    },
    inputOb: {
        height: 98,
    },
    inputFecha: {
        width: 160,
    },
    wallet: {
        marginTop: 16,
        marginBottom: 32,
    },
    content: {
        marginHorizontal: 20,
    },
    btnImage: {
        justifyContent: "space-between",
        marginTop: 48,
        flex: 1,
    },
    btnText: {
        marginTop: 24,
    },
});
