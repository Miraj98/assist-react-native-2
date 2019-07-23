import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'

const Author = (props) => {
    if(props.author !== undefined) {
        const timestamp = calculateTime(props.timestamp)
        return (
            <TouchableOpacity style={styles.authorContainer}>
                <Text style={styles.author}>{props.author}</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
            </TouchableOpacity>
        )
    } else {
        return null
    }
}

const Content = (props) => {
    if(props.title === undefined && props.content === undefined) return null
    else return (
        <TouchableOpacity>
            {
                props.title !== undefined && props.title !== 'null' ?
                <Text style={styles.title}>{props.title}</Text> : null
            }
            {
                props.content !== undefined ?
                <Text style={styles.content}>{props.content}</Text> : null
            }
        </TouchableOpacity>
    )
}

const calculateTime = (_date) => {
    const date = new Date(_date)
    const now = new Date()
    let difference = (now.getTime() - date.getTime())/1000
    if(difference < 60) {
        return Math.floor(difference) + ' s ago'
    } else {
        difference = difference / 60
        if(difference < 60) {
            let value = Math.floor(difference)
            return value + ` min${value === 1 ? '': 's'} ago`
        } else {
            difference = difference / 60
            if(difference < 24) {
                let value = Math.floor(difference)
                return value + ` hour${value === 1 ? '': 's'} ago`
            } else {
                difference = difference / 24
                if(difference < 30) {
                    let value = Math.floor(difference)
                    return value + ` day${value === 1 ? '': 's'} ago`
                } else {
                    difference = difference / 30
                    if(difference < 12) {
                        let value = Math.floor(difference)
                        return value + ` month${value === 1 ? '': 's'} ago`
                    } else {
                        let value = Math.floor(difference)
                        return value + ` month${value === 1 ? '': 's'} ago`
                    }
                }
            }
        }
    }
}

function Card(props) {
    const image = props.profile_photo_url === null ? require('../../assets/avatar1.png') : { uri: props.profile_photo_url }
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.imageContainer}>
                <FastImage style={[styles.defaultImageStyle]} source={image} />
            </TouchableOpacity>
            <View style={styles.body}>
                <Author author={props.author} timestamp={props.timestamp} />
                <Content title={props.title} content={props.content} />
            </View>
        </View>
    )
}

Card.propTypes = {
    profile_photo_url: PropTypes.string,
    author: PropTypes.string,
    timestamp: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number.isRequired,
    captionId: PropTypes.number
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 4,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    imageContainer: {
        padding: 4
    },
    defaultImageStyle: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    body: {
        padding: 4,
        marginLeft: 8,
        flex: 1,
        flexWrap: 'wrap'
    },
    authorContainer: {
        flex: 1,
        marginBottom: 8
    },
    author: {
        fontWeight: 'bold'
    },
    timestamp: {
        fontSize: 10,
        color: '#424242', 
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 2
    }
})

export default Card