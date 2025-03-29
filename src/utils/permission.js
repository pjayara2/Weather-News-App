import { PERMISSIONS, request } from 'react-native-permissions';
import { Platform } from 'react-native';

export default requestLocationPermission = async () => {
    return new Promise(function (resolve, reject) {
        request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            })
        )
            .then((result) => { resolve(result); })
            .catch((error) => { resolve(error); });
    });
};
