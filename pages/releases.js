import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Link from 'next/link';
import ArrowLeft from '../public/assets/icons/arrow-left.svg';
import {
  getGeocode,
  getDetails
} from 'use-places-autocomplete';
import mapStyles from '../components/releases/mapStyles.js';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 48.864716,
  lng: 2.349014
};

const libraries = ['places'];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyles
}

const ReleaseSummary = ({release}) => {

  return release.link 
    ? (
      <div className='release-summary'>
        <div 
          className={`thumbnail ${release.thumbnailURL?'':'placeholder'}`}
          style={{
            backgroundImage: `url(${release.thumbnailURL})`
          }}
        >
          <span role="img" aria-label="shrug">🙅‍♂️</span>
          <h3>No thumbnail available</h3>
        </div>
        <div className='details'>
          <h1>{release.name}</h1>
          <p>Release note:</p>
          <a href={release.link} target='_blank'>{release.link}</a>
        </div>
      </div>
    ) 
    : <></>;
}

export default function ReleaseMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAUb8WfZT10NNXhEqcdbvtnWkE_iVtEdEk",//process.env.GOOGLE_API_KEY,
    libraries
  });
  const [map, setMap] = useState(null);
  const [releases, setReleases] = useState([]);
  const [offices, setOffices] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetch('/api/locations')
      .then((res) => res.json())
      .then((data) => {
        setReleases(data?.locations.filter((location) => location.type === 'release'));
        setOffices(data?.locations.filter((location) => location.type === 'office'));
      })
  }, [])

  //const onLoad = useCallback(async (map) => {
  //  const bounds = new window.google.maps.LatLngBounds(center);
//
  //  map.fitBounds(bounds);
  //  setMap(map);
  //}, [])

  const onUnmount = useCallback((map) => {
    setMap(null)
  }, []);

  const openRelease = useCallback(async (release) => {
    try {
      const results = await getGeocode({ address: release.name });
      const { place_id } = results?.[0];
      const { photos } = await getDetails({
        placeId: place_id, 
        fields: ["photos"]
      })
      const index = Math.random(0, 1) * photos.length;

      setSelected({
        ...release,
        thumbnailURL: photos[parseInt(index)].getUrl()
      });
    } catch (error) {
      setSelected({
        ...release,
        thumbnailURL: undefined
      });
    }
  });

  return isLoaded ? (
    <>
      <header>
        <Link
          href='/'
          >
          <div className='back-button'>
            <ArrowLeft />
          </div>
        </Link>
        <h1>
          Releases
        </h1>
      </header> 
      <section>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          options={options}
          //onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          { 
            releases.map((marker) => (
              <Marker 
                key={marker.name} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                  url:'/assets/icons/favicon.png',
                  scaledSize: new window.google.maps.Size(24, 24),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(12, 12),
                }}
                onClick={() => openRelease(marker)}
                />
            )) 
          }
          { 
            offices.map((marker) => (
              <Marker 
                key={marker.name} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                  url:'/assets/icons/house-white.svg',
                  scaledSize: new window.google.maps.Size(24, 24),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(12, 12),
                }}
                />
            )) 
          }
        </GoogleMap>

        <ReleaseSummary release={selected} />
      </section>
    </>
  ) : <></>
}
