function getUserDescription(user) {
    if (!user || typeof user !== 'object') {
        return '-';
    }

    if (user.name && user.email) {
        if (user.phoneNumber) {
            return `${user.name} (${user.email}, phone ${user.phoneNumber})`;
        } else {
            return `${user.name} (${user.email})`;
        }
    } else if (user.email) {
        if (user.phoneNumber) {
            return `${user.email} (phone ${user.phoneNumber})`;
        } else {
            return user.email;
        }
    } else if (user.name) {
        if (user.phoneNumber) {
            return `${user.name} (phone ${user.phoneNumber})`;
        } else {
            return user.name;
        }
    } else {
        return 'name/email unknown';
    }
}

export default getUserDescription;
