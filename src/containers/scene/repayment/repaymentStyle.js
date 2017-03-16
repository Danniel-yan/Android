/**
 * Created by yshr on 17/3/14.
 */
import {StyleSheet} from 'react-native';
import {border, colors} from 'styles';
/**/

export default StyleSheet.create({

    wrap_content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    item: {
        //flex: 1,
        flexDirection: 'row',
        height: 57,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        marginTop: 5
    },
    textColor: {
        fontSize: 16,
        color: '#333333',
        paddingLeft: 10,
        paddingRight: 10,
    },
    textinput: {
        width: 160,
        textAlign: 'right',
        padding: 0
    },
    icon_bank: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    text_bottom_view: {
        height: 140,
        padding: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        marginTop: 5,
        justifyContent:'center'
    },
    text_bottom: {
        fontSize: 12,
        color: '#666666'
    },
    text_bottom_item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_bottom_icon: {
        width: 4,
        height: 4,
        marginRight:5,
    },

    btnText: {
        fontSize: 18,
        color: colors.white,
    },
    btn: {
        height: 50,
        marginHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.secondary,
        backgroundColor: '#FF003C',
        bottom: 50
    },

});