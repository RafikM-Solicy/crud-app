const BASE_URL = 'http://localhost:4001';

export const getLocations = async () => {
    try {
        const response = await fetch(`${BASE_URL}/location`);
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createLocation = async (location) => {
    try {
        const response = await fetch(`${BASE_URL}/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
        });
        if (!response.ok) {
            throw new Error('Failed to create location');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateLocation = async (id, location) => {
    try {
        const response = await fetch(`${BASE_URL}/location/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
        });
        if (!response.ok) {
            throw new Error('Failed to update location');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteLocation = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/location/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete location');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
