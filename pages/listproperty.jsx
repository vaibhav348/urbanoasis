import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header1 from "@/components/Header1";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import Link from "next/link";

const MAX_GALLERY_IMAGES = 5; 
const ListProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    banner: '',
    gallery: [''],
    price: '',
    discount: '',
    facilities: [],
    location: '' ,
    owner : ''
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const facilitiesOptions = [
    { label: "Wi-Fi", value: "Free Wi-Fi", url:"https://img.icons8.com/?size=100&id=9922&format=png&color=000000" },
    { label: "Pet Friendly", value: "Pet Friendly", url:"https://img.icons8.com/?size=100&id=123945&format=png&color=000000" },
    { label: "Near Railway Station", value: "Railway Station", url:"https://img.icons8.com/?size=100&id=248&format=png&color=000000" }, 
    { label: "Near Bus Station", value: "Near Bus Station", url:"https://img.icons8.com/?size=100&id=9351&format=png&color=000000"},
    { label: "Near Airport", value: "Near Airport", url:"https://img.icons8.com/?size=100&id=8771&format=png&color=000000"},
    { label: "Parking", value: "Parking", url:"https://img.icons8.com/?size=100&id=10738&format=png&color=000000"},
    { label: "AC", value: "AC", url:"https://img.icons8.com/?size=100&id=8086&format=png&color=000000"},
    { label: "Geyser", value: "Geyser", url:"https://img.icons8.com/?size=100&id=5AivCqdliCdS&format=png&color=000000"},
    { label: "TV", value: "TV", url:"https://img.icons8.com/?size=100&id=9989&format=png&color=000000"},
    { label: "Balcony", value: "Balcony", url:"https://img.icons8.com/?size=100&id=8017&format=png&color=000000" }
  ];
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

  const router = useRouter();

  useEffect(() => {
    const checkUserCookie = () => {
      const profileCookie = getCookie('profile');
       setFormData({ ...formData, owner: profileCookie });
      const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
      if (userCookie) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
        router.push('/login');
      }
    };

    checkUserCookie();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price' && (value < 0 || value > 5000)) {
        toast.error('Price must be between 0 and 5000.');
        return;
    }

    if (name === 'discount' && (value < 0 || value > 15)) {
        toast.error('Discount must be between 0 and 15.');
        return;
    }

    setFormData({ ...formData, [name]: value });
};

  const handleGalleryChange = (index, value) => {
    const updatedGallery = [...formData.gallery];
    updatedGallery[index] = value;
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const addGalleryImage = () => {
    if (formData.gallery.length >= MAX_GALLERY_IMAGES) {
      setError(`You can only add up to ${MAX_GALLERY_IMAGES} images.`);
      return;
    }
    setFormData({ ...formData, gallery: [...formData.gallery, ''] });
    setError(''); // Clear any previous error messages
  };

  const handleFacilityChange = (o) => {
    const updatedFacilities = [...formData.facilities];
    const facilityIndex = updatedFacilities.findIndex(facility => facility.name === o.value);

    if (facilityIndex > -1) {
      // Remove the facility if already selected
      updatedFacilities.splice(facilityIndex, 1);
    } else {
      // Add the facility with an empty img string
      updatedFacilities.push({ img: o.url, name: o.value });
    }

    setFormData({ ...formData, facilities: updatedFacilities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch('/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      toast("property added successfully.")
      console.log('Form submitted successfully:', data);

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div >
       <Head>
      <title>UrbanOasis : Add Property</title>
        </Head>
      <Header1 />
      
      {isUserLoggedIn ? (
        <div className="bg-gradient-to-r from-blue-500 to-red-500 p-10">
        
          <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white text-white rounded-lg shadow-md max-w-lg mx-auto ">
            <div>
              <label className="block text-sm font-medium text-gray-800">Property name </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-gray-100 border text-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">About</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-gray-100 border text-gray-800  border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Main Image URL</label>
              <input
                type="text"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                required
                className="mt-1 text-gray-800  block w-full p-2 bg-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Gallery Images</label>
              {formData.gallery.map((image, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => handleGalleryChange(index, e.target.value)}
                    required
                    className="flex-1 p-2 text-gray-800  bg-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <button
                type="button"
                onClick={addGalleryImage}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 transition duration-300 ease-in-out"
              >
                Add Image
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 text-gray-800  block w-full p-2 bg-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Discount</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                required
                className="mt-1 text-gray-800  block w-full p-2 bg-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Facilities</label>
              <div className="mt-2 space-y-2">
                {facilitiesOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={option.value}
                      value={option.value}
                      checked={formData.facilities.some(facility => facility.name === option.value)}
                      onChange={() => handleFacilityChange(option)}
                      className="h-4 w-4 text-red-600 border-gray-600 rounded focus:ring-red-500 bg-gray-800"
                    />
                    <label htmlFor={option.value} className="text-sm text-gray-800">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-gray-100 border text-gray-800  border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}

export default ListProperty;
