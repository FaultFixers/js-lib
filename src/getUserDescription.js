function getUserDescription(user) {
    if (!user || typeof user !== 'object') {
        return '-';
    }
    if (user.name && user.email) {
        return `${user.name} (${user.email})`;
    }
    if (user.name) {
        return user.name;
    }
    if (user.email) {
        return user.email;
    }
    return 'name/email unknown';
}

export default getUserDescription;
