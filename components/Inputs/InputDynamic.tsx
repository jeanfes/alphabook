import { Pressable, TextInput, View } from 'react-native';
import { IconEye } from '@/assets/icons/IconsForms';
import { IconCheck } from '@/assets/icons/IconsForms';
import { IconNoCheck } from '@/assets/icons/IconsForms';
import { useEffect, useRef, useState } from 'react';

interface InputDynamicProps {
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
    onBlur?: any;
    secureTextEntry?: boolean;
    check?: boolean | null;
    autoFocus?: boolean;
    id?: string;
}

export const InputDynamic = ({ placeholder, value, onChange, onBlur, secureTextEntry = false, check = false, id, autoFocus }: InputDynamicProps) => {
    const [isTextVisible, setIsTextVisible] = useState(!secureTextEntry);
    const inputRef = useRef<TextInput>(null);
    const toggleTextVisibility = () => {
        setIsTextVisible((prevState) => !prevState);
    };

    useEffect(() => {
        setIsTextVisible(!secureTextEntry);
    }, [secureTextEntry]);

    useEffect(() => {
        if (autoFocus) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [autoFocus]);

    return (
        <View
            style={{
                ...styles.inputContainer,
                borderColor: check ? '#27AE60' : '#8E8E93',
            }}
        >
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry && !isTextVisible}
                id={id}
            />
            {!secureTextEntry && (
                <Pressable style={styles.icon} onPress={toggleTextVisibility}>
                    {check === true ? <IconCheck /> : check === false ? <IconNoCheck /> : null}
                </Pressable>
            )}
            {secureTextEntry && (
                <Pressable style={styles.icon} onPress={toggleTextVisibility}>
                    {isTextVisible ? <IconEye color="#EB5757" /> : <IconEye />}
                </Pressable>
            )}
        </View>
    );
};
const styles = {
    inputContainer: {
        flex: 1,
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between',
        minHeight: 65,
        marginBottom: 10,
        borderColor: '#8E8E93',
        borderWidth: 1,
        paddingLeft: 28,
        borderRadius: 8,
        paddingRight: 14,
    },
    input: {
        flex: 9,
        fontSize: 16,
        fontFamily: 'OpenSansRegular',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        paddingLeft: 0,
        paddingRight: 5,
    },
    icon: {
        flex: 1,
        width: 30,
        height: 30,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
    },
};
