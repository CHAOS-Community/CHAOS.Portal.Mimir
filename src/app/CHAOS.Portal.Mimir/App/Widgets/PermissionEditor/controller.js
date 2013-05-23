define(["require", "exports"], function(require, exports) {
    
    var PermissionEditor = (function () {
        function PermissionEditor(element, settings) {
            this.Permissions = [];
            if(!settings.Names) {
                throw "Names must be set in settings";
            }
            this.Value = settings.Value;
            for(var i = 0; i < settings.Names.length; i++) {
                this.Permissions.push(new Permission(settings.Names[i], i, this.Value));
            }
        }
        return PermissionEditor;
    })();
    exports.PermissionEditor = PermissionEditor;    
    var Permission = (function () {
        function Permission(name, position, permissionsValue) {
            this.Value = ko.observable();
            this.Name = name;
            this._bitMask = 1 << position;
            this._permissionsValue = permissionsValue;
            this.Value((permissionsValue() & this._bitMask) > 0);
            this._permissionsValue.subscribe(this.PermissionsValueChanged, this);
            this.Value.subscribe(this.ValueChanged, this);
        }
        Permission.prototype.PermissionsValueChanged = function (newValue) {
            this.Value((newValue & this._bitMask) > 0);
        };
        Permission.prototype.ValueChanged = function (newValue) {
            if(newValue) {
                this._permissionsValue(this._permissionsValue() | this._bitMask);
            } else {
                this._permissionsValue(this._permissionsValue() & (~this._bitMask));
            }
        };
        return Permission;
    })();
    exports.Permission = Permission;    
})
