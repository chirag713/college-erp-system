export const requirePermission = (permission) => {
  return (req, res, next) => {
    // Basic placeholder for permission logic if needed
    // Assuming req.user.permissions exists
    if (req.user && req.user.role === 'admin') {
      return next(); // admin has all permissions
    }
    if (!req.user || !req.user.permissions || !req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: `Permission '${permission}' denied` });
    }
    next();
  };
};
