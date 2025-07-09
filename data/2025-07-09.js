
mesh_request = [
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"31120a8a-1bc3-4c13-b24c-45a7329c9832",
        "params":[
            "00000000000000000000000000000000",
            "network.mesh",
            "easymesh_supported",
            {}
        ]
    }
]

mesh_response = [
    {
        "jsonrpc": "2.0",
        "id": "31120a8a-1bc3-4c13-b24c-45a7329c9832",
        "result": [
            0,
            {
                "easymesh": false
            }
        ]
    }
]

login_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"481b9551-2e03-4af8-a7da-b58ddace8d2b",
    "params":[
        "00000000000000000000000000000000",
        "session",
        "login",
        {
            "username":"root",
            "password":"",
            "timeout":900
        }
    ]
}

login_response = {
    "jsonrpc": "2.0",
    "id": "481b9551-2e03-4af8-a7da-b58ddace8d2b",
    "result": [
        0,
        {
            "ubus_rpc_session": "ac9dfe2c98ef3193c89c699254d6fb8b",
            "timeout": 900,
            "expires": 899,
            "acls": {
                "access-group": {
                    "accounts": [
                        "write"
                    ],
                    "acd": [
                        "read",
                        "write"
                    ],
                    "admin": [
                        "read",
                        "write"
                    ],
                    "api": [
                        "read"
                    ],
                    "avahi": [
                        "read",
                        "write"
                    ],
                    "backup": [
                        "read",
                        "write"
                    ],
                    "buzzer": [
                        "read"
                    ],
                    "configsync": [
                        "read",
                        "write"
                    ],
                    "core": [
                        "read"
                    ],
                    "cron": [
                        "read",
                        "write"
                    ],
                    "customization": [
                        "read"
                    ],
                    "delos": [
                        "read"
                    ],
                    "delos-backhaulMonitor": [
                        "read",
                        "write"
                    ],
                    "device_name": [
                        "read",
                        "write"
                    ],
                    "diagnostics": [
                        "read"
                    ],
                    "ezmesh": [
                        "read",
                        "write"
                    ],
                    "factorydefault": [
                        "read",
                        "write"
                    ],
                    "firewall": [
                        "read",
                        "write"
                    ],
                    "fwuagent": [
                        "read",
                        "write"
                    ],
                    "ghn": [
                        "read",
                        "write"
                    ],
                    "homeplug": [
                        "read",
                        "write"
                    ],
                    "hostnames": [
                        "read",
                        "write"
                    ],
                    "hyd": [
                        "read",
                        "write"
                    ],
                    "hyd-syslog": [
                        "read",
                        "write"
                    ],
                    "lbd": [
                        "read",
                        "write"
                    ],
                    "leds": [
                        "read",
                        "write"
                    ],
                    "mdnsresponder": [
                        "read",
                        "write"
                    ],
                    "network": [
                        "read",
                        "write"
                    ],
                    "parental_control": [
                        "read",
                        "write"
                    ],
                    "powerline": [
                        "read",
                        "write"
                    ],
                    "radius": [
                        "read",
                        "write"
                    ],
                    "repacd": [
                        "read",
                        "write"
                    ],
                    "repeater": [
                        "read",
                        "write"
                    ],
                    "snmp": [
                        "read",
                        "write"
                    ],
                    "software": [
                        "read",
                        "write"
                    ],
                    "startup": [
                        "read",
                        "write"
                    ],
                    "station_quota": [
                        "read",
                        "write"
                    ],
                    "status": [
                        "read"
                    ],
                    "system": [
                        "read",
                        "write"
                    ],
                    "systeminformation": [
                        "read"
                    ],
                    "tr069": [
                        "read",
                        "write"
                    ],
                    "unauthenticated": [
                        "read"
                    ],
                    "upgrade": [
                        "read",
                        "write"
                    ],
                    "upnpd": [
                        "read",
                        "write"
                    ],
                    "users": [
                        "read",
                        "write"
                    ],
                    "vlan": [
                        "read",
                        "write"
                    ],
                    "wifi_schedule": [
                        "read",
                        "write"
                    ],
                    "wifitoggle": [
                        "read"
                    ],
                    "wsplcd": [
                        "read",
                        "write"
                    ]
                },
                "base-cgi": {
                    "backup": [
                        "read"
                    ],
                    "upload": [
                        "write"
                    ]
                },
                "ubus": {
                    "api": [
                        "IdentifyDeviceStart"
                    ],
                    "ath10k.peerstat": [
                        "get"
                    ],
                    "buzzer": [
                        "*"
                    ],
                    "device_name": [
                        "get",
                        "to_host_name",
                        "to_plc_name",
                        "set"
                    ],
                    "ezmesh": [
                        "get_nodes"
                    ],
                    "fwuagent": [
                        "force_poll",
                        "get_deployment",
                        "accept_deployment"
                    ],
                    "iwinfo": [
                        "devices",
                        "info",
                        "assoclist",
                        "phyname",
                        "scan",
                        "freqlist"
                    ],
                    "luci2.network": [
                        "conntrack_count",
                        "dhcp_leases",
                        "dhcp6_leases",
                        "arp_table",
                        "routes",
                        "routes6",
                        "ping",
                        "ping6",
                        "traceroute",
                        "traceroute6",
                        "nslookup",
                        "switch_list",
                        "switch_info",
                        "switch_status",
                        "device_list"
                    ],
                    "luci2.network.bwmon": [
                        "devices",
                        "statistics"
                    ],
                    "luci2.opkg": [
                        "list",
                        "list_installed",
                        "find",
                        "config_get",
                        "install",
                        "remove",
                        "update",
                        "config_set"
                    ],
                    "luci2.system": [
                        "diskfree",
                        "syslog",
                        "dmesg",
                        "process_list",
                        "init_list",
                        "init_action",
                        "sshkeys_get",
                        "sshkeys_set",
                        "password_set",
                        "rclocal_get",
                        "rclocal_set",
                        "crontab_get",
                        "crontab_set",
                        "led_list",
                        "usb_list"
                    ],
                    "luci2.ui": [
                        "*"
                    ],
                    "network": [
                        "get_proto_handlers"
                    ],
                    "network.device": [
                        "status"
                    ],
                    "network.ghntool": [
                        "ghninfo",
                        "get_parameter",
                        "get_settings",
                        "get_pairing_state",
                        "version",
                        "pushbtn",
                        "set_npw",
                        "factory_reset",
                        "set_settings"
                    ],
                    "network.info": [
                        "*"
                    ],
                    "network.interface": [
                        "status",
                        "dump"
                    ],
                    "network.interface.*": [
                        "status"
                    ],
                    "network.interface.wwan": [
                        "up",
                        "down"
                    ],
                    "network.mesh": [
                        "easymesh_supported",
                        "enable",
                        "disable",
                        "get_mode",
                        "set_mode"
                    ],
                    "network.plctool": [
                        "fw_version",
                        "identity",
                        "membership",
                        "avlninfo",
                        "get_pibsettings",
                        "defaults",
                        "pushbtn",
                        "set_nmk",
                        "set_npw",
                        "add_secid",
                        "set_pibsettings"
                    ],
                    "network.powerline": [
                        "get_compat_mode",
                        "get_compat_settings",
                        "intmtg_active_approach",
                        "intmtg_logical_approach_status",
                        "get_user_notches",
                        "set_compat_mode",
                        "set_compat_settings",
                        "set_user_notches"
                    ],
                    "network.swconfig": [
                        "list",
                        "status",
                        "info"
                    ],
                    "network.wifi": [
                        "*"
                    ],
                    "network.wireless": [
                        "status"
                    ],
                    "network.wps": [
                        "*"
                    ],
                    "repeater": [
                        "*"
                    ],
                    "service": [
                        "list"
                    ],
                    "session": [
                        "access",
                        "destroy",
                        "get",
                        "get_timeout",
                        "refresh",
                        "login"
                    ],
                    "station_quota": [
                        "status"
                    ],
                    "system": [
                        "info",
                        "board"
                    ],
                    "system.accounts": [
                        "password_set"
                    ],
                    "system.date": [
                        "get"
                    ],
                    "system.info": [
                        "syslog",
                        "image",
                        "timezones"
                    ],
                    "system.init": [
                        "list"
                    ],
                    "system.management": [
                        "reboot",
                        "version"
                    ],
                    "system.management.backup": [
                        "get",
                        "list",
                        "clean",
                        "set",
                        "restore",
                        "restore_state"
                    ],
                    "system.management.factorydefault": [
                        "test",
                        "start"
                    ],
                    "system.management.upgrade": [
                        "test",
                        "start",
                        "clean"
                    ],
                    "system.thermal": [
                        "get"
                    ],
                    "tr069": [
                        "notify",
                        "inform",
                        "command"
                    ],
                    "tr069.cacert": [
                        "get_properties",
                        "set"
                    ],
                    "tr069.cert": [
                        "get_properties",
                        "set"
                    ],
                    "uci": [
                        "get",
                        "*"
                    ],
                    "wifitoggle": [
                        "remaining",
                        "toggle"
                    ]
                },
                "uci": {
                    "acd": [
                        "read",
                        "write"
                    ],
                    "avahi": [
                        "read",
                        "write"
                    ],
                    "configsync": [
                        "read",
                        "write"
                    ],
                    "customization": [
                        "read"
                    ],
                    "delos": [
                        "read"
                    ],
                    "delos-backhaulMonitor": [
                        "read",
                        "write"
                    ],
                    "dhcp": [
                        "read",
                        "write"
                    ],
                    "dropbear": [
                        "read",
                        "write"
                    ],
                    "easycwmp": [
                        "read",
                        "write"
                    ],
                    "ezmesh": [
                        "read",
                        "write"
                    ],
                    "firewall": [
                        "read",
                        "write"
                    ],
                    "fwuagent": [
                        "read",
                        "write"
                    ],
                    "ghn": [
                        "read",
                        "write"
                    ],
                    "hyd": [
                        "read",
                        "write"
                    ],
                    "hyd-syslog": [
                        "read",
                        "write"
                    ],
                    "lbd": [
                        "read",
                        "write"
                    ],
                    "luci": [
                        "read",
                        "write"
                    ],
                    "mDNSResponder": [
                        "read",
                        "write"
                    ],
                    "network": [
                        "read",
                        "write"
                    ],
                    "parental_control": [
                        "read",
                        "write"
                    ],
                    "plc": [
                        "read",
                        "write"
                    ],
                    "radius": [
                        "read",
                        "write"
                    ],
                    "repacd": [
                        "read",
                        "write"
                    ],
                    "repeater": [
                        "read",
                        "write"
                    ],
                    "rpcd": [
                        "read",
                        "write"
                    ],
                    "snmpd": [
                        "read",
                        "write"
                    ],
                    "station_quota": [
                        "read",
                        "write"
                    ],
                    "system": [
                        "read",
                        "write"
                    ],
                    "tr069_stun": [
                        "read",
                        "write"
                    ],
                    "tr069_upnp": [
                        "read",
                        "write"
                    ],
                    "tr069_xmpp": [
                        "read",
                        "write"
                    ],
                    "upgrade": [
                        "read",
                        "write"
                    ],
                    "upnpd": [
                        "read",
                        "write"
                    ],
                    "vlan": [
                        "read",
                        "write"
                    ],
                    "wifi_schedule": [
                        "read",
                        "write"
                    ],
                    "wireless": [
                        "read",
                        "write"
                    ],
                    "wsplcd": [
                        "read",
                        "write"
                    ]
                }
            },
            "data": {
                "username": "root"
            }
        }
    ]
}

login_response = {
    "jsonrpc": "2.0",
    "id": "481b9551-2e03-4af8-a7da-b58ddace8d2b",
    "result": [
        0,
        {
            "ubus_rpc_session": "ac9dfe2c98ef3193c89c699254d6fb8b",
            "timeout": 900,
            "expires": 899,
            "acls": {
                "access-group": {
                    "accounts": [
                        "write"
                    ],
                    "acd": [
                        "read",
                        "write"
                    ],
                    "admin": [
                        "read",
                        "write"
                    ],
                    "api": [
                        "read"
                    ],
                    "avahi": [
                        "read",
                        "write"
                    ],
                    "backup": [
                        "read",
                        "write"
                    ],
                    "buzzer": [
                        "read"
                    ],
                    "configsync": [
                        "read",
                        "write"
                    ],
                    "core": [
                        "read"
                    ],
                    "cron": [
                        "read",
                        "write"
                    ],
                    "customization": [
                        "read"
                    ],
                    "delos": [
                        "read"
                    ],
                    "delos-backhaulMonitor": [
                        "read",
                        "write"
                    ],
                    "device_name": [
                        "read",
                        "write"
                    ],
                    "diagnostics": [
                        "read"
                    ],
                    "ezmesh": [
                        "read",
                        "write"
                    ],
                    "factorydefault": [
                        "read",
                        "write"
                    ],
                    "firewall": [
                        "read",
                        "write"
                    ],
                    "fwuagent": [
                        "read",
                        "write"
                    ],
                    "ghn": [
                        "read",
                        "write"
                    ],
                    "homeplug": [
                        "read",
                        "write"
                    ],
                    "hostnames": [
                        "read",
                        "write"
                    ],
                    "hyd": [
                        "read",
                        "write"
                    ],
                    "hyd-syslog": [
                        "read",
                        "write"
                    ],
                    "lbd": [
                        "read",
                        "write"
                    ],
                    "leds": [
                        "read",
                        "write"
                    ],
                    "mdnsresponder": [
                        "read",
                        "write"
                    ],
                    "network": [
                        "read",
                        "write"
                    ],
                    "parental_control": [
                        "read",
                        "write"
                    ],
                    "powerline": [
                        "read",
                        "write"
                    ],
                    "radius": [
                        "read",
                        "write"
                    ],
                    "repacd": [
                        "read",
                        "write"
                    ],
                    "repeater": [
                        "read",
                        "write"
                    ],
                    "snmp": [
                        "read",
                        "write"
                    ],
                    "software": [
                        "read",
                        "write"
                    ],
                    "startup": [
                        "read",
                        "write"
                    ],
                    "station_quota": [
                        "read",
                        "write"
                    ],
                    "status": [
                        "read"
                    ],
                    "system": [
                        "read",
                        "write"
                    ],
                    "systeminformation": [
                        "read"
                    ],
                    "tr069": [
                        "read",
                        "write"
                    ],
                    "unauthenticated": [
                        "read"
                    ],
                    "upgrade": [
                        "read",
                        "write"
                    ],
                    "upnpd": [
                        "read",
                        "write"
                    ],
                    "users": [
                        "read",
                        "write"
                    ],
                    "vlan": [
                        "read",
                        "write"
                    ],
                    "wifi_schedule": [
                        "read",
                        "write"
                    ],
                    "wifitoggle": [
                        "read"
                    ],
                    "wsplcd": [
                        "read",
                        "write"
                    ]
                },
                "base-cgi": {
                    "backup": [
                        "read"
                    ],
                    "upload": [
                        "write"
                    ]
                },
                "ubus": {
                    "api": [
                        "IdentifyDeviceStart"
                    ],
                    "ath10k.peerstat": [
                        "get"
                    ],
                    "buzzer": [
                        "*"
                    ],
                    "device_name": [
                        "get",
                        "to_host_name",
                        "to_plc_name",
                        "set"
                    ],
                    "ezmesh": [
                        "get_nodes"
                    ],
                    "fwuagent": [
                        "force_poll",
                        "get_deployment",
                        "accept_deployment"
                    ],
                    "iwinfo": [
                        "devices",
                        "info",
                        "assoclist",
                        "phyname",
                        "scan",
                        "freqlist"
                    ],
                    "luci2.network": [
                        "conntrack_count",
                        "dhcp_leases",
                        "dhcp6_leases",
                        "arp_table",
                        "routes",
                        "routes6",
                        "ping",
                        "ping6",
                        "traceroute",
                        "traceroute6",
                        "nslookup",
                        "switch_list",
                        "switch_info",
                        "switch_status",
                        "device_list"
                    ],
                    "luci2.network.bwmon": [
                        "devices",
                        "statistics"
                    ],
                    "luci2.opkg": [
                        "list",
                        "list_installed",
                        "find",
                        "config_get",
                        "install",
                        "remove",
                        "update",
                        "config_set"
                    ],
                    "luci2.system": [
                        "diskfree",
                        "syslog",
                        "dmesg",
                        "process_list",
                        "init_list",
                        "init_action",
                        "sshkeys_get",
                        "sshkeys_set",
                        "password_set",
                        "rclocal_get",
                        "rclocal_set",
                        "crontab_get",
                        "crontab_set",
                        "led_list",
                        "usb_list"
                    ],
                    "luci2.ui": [
                        "*"
                    ],
                    "network": [
                        "get_proto_handlers"
                    ],
                    "network.device": [
                        "status"
                    ],
                    "network.ghntool": [
                        "ghninfo",
                        "get_parameter",
                        "get_settings",
                        "get_pairing_state",
                        "version",
                        "pushbtn",
                        "set_npw",
                        "factory_reset",
                        "set_settings"
                    ],
                    "network.info": [
                        "*"
                    ],
                    "network.interface": [
                        "status",
                        "dump"
                    ],
                    "network.interface.*": [
                        "status"
                    ],
                    "network.interface.wwan": [
                        "up",
                        "down"
                    ],
                    "network.mesh": [
                        "easymesh_supported",
                        "enable",
                        "disable",
                        "get_mode",
                        "set_mode"
                    ],
                    "network.plctool": [
                        "fw_version",
                        "identity",
                        "membership",
                        "avlninfo",
                        "get_pibsettings",
                        "defaults",
                        "pushbtn",
                        "set_nmk",
                        "set_npw",
                        "add_secid",
                        "set_pibsettings"
                    ],
                    "network.powerline": [
                        "get_compat_mode",
                        "get_compat_settings",
                        "intmtg_active_approach",
                        "intmtg_logical_approach_status",
                        "get_user_notches",
                        "set_compat_mode",
                        "set_compat_settings",
                        "set_user_notches"
                    ],
                    "network.swconfig": [
                        "list",
                        "status",
                        "info"
                    ],
                    "network.wifi": [
                        "*"
                    ],
                    "network.wireless": [
                        "status"
                    ],
                    "network.wps": [
                        "*"
                    ],
                    "repeater": [
                        "*"
                    ],
                    "service": [
                        "list"
                    ],
                    "session": [
                        "access",
                        "destroy",
                        "get",
                        "get_timeout",
                        "refresh",
                        "login"
                    ],
                    "station_quota": [
                        "status"
                    ],
                    "system": [
                        "info",
                        "board"
                    ],
                    "system.accounts": [
                        "password_set"
                    ],
                    "system.date": [
                        "get"
                    ],
                    "system.info": [
                        "syslog",
                        "image",
                        "timezones"
                    ],
                    "system.init": [
                        "list"
                    ],
                    "system.management": [
                        "reboot",
                        "version"
                    ],
                    "system.management.backup": [
                        "get",
                        "list",
                        "clean",
                        "set",
                        "restore",
                        "restore_state"
                    ],
                    "system.management.factorydefault": [
                        "test",
                        "start"
                    ],
                    "system.management.upgrade": [
                        "test",
                        "start",
                        "clean"
                    ],
                    "system.thermal": [
                        "get"
                    ],
                    "tr069": [
                        "notify",
                        "inform",
                        "command"
                    ],
                    "tr069.cacert": [
                        "get_properties",
                        "set"
                    ],
                    "tr069.cert": [
                        "get_properties",
                        "set"
                    ],
                    "uci": [
                        "get",
                        "*"
                    ],
                    "wifitoggle": [
                        "remaining",
                        "toggle"
                    ]
                },
                "uci": {
                    "acd": [
                        "read",
                        "write"
                    ],
                    "avahi": [
                        "read",
                        "write"
                    ],
                    "configsync": [
                        "read",
                        "write"
                    ],
                    "customization": [
                        "read"
                    ],
                    "delos": [
                        "read"
                    ],
                    "delos-backhaulMonitor": [
                        "read",
                        "write"
                    ],
                    "dhcp": [
                        "read",
                        "write"
                    ],
                    "dropbear": [
                        "read",
                        "write"
                    ],
                    "easycwmp": [
                        "read",
                        "write"
                    ],
                    "ezmesh": [
                        "read",
                        "write"
                    ],
                    "firewall": [
                        "read",
                        "write"
                    ],
                    "fwuagent": [
                        "read",
                        "write"
                    ],
                    "ghn": [
                        "read",
                        "write"
                    ],
                    "hyd": [
                        "read",
                        "write"
                    ],
                    "hyd-syslog": [
                        "read",
                        "write"
                    ],
                    "lbd": [
                        "read",
                        "write"
                    ],
                    "luci": [
                        "read",
                        "write"
                    ],
                    "mDNSResponder": [
                        "read",
                        "write"
                    ],
                    "network": [
                        "read",
                        "write"
                    ],
                    "parental_control": [
                        "read",
                        "write"
                    ],
                    "plc": [
                        "read",
                        "write"
                    ],
                    "radius": [
                        "read",
                        "write"
                    ],
                    "repacd": [
                        "read",
                        "write"
                    ],
                    "repeater": [
                        "read",
                        "write"
                    ],
                    "rpcd": [
                        "read",
                        "write"
                    ],
                    "snmpd": [
                        "read",
                        "write"
                    ],
                    "station_quota": [
                        "read",
                        "write"
                    ],
                    "system": [
                        "read",
                        "write"
                    ],
                    "tr069_stun": [
                        "read",
                        "write"
                    ],
                    "tr069_upnp": [
                        "read",
                        "write"
                    ],
                    "tr069_xmpp": [
                        "read",
                        "write"
                    ],
                    "upgrade": [
                        "read",
                        "write"
                    ],
                    "upnpd": [
                        "read",
                        "write"
                    ],
                    "vlan": [
                        "read",
                        "write"
                    ],
                    "wifi_schedule": [
                        "read",
                        "write"
                    ],
                    "wireless": [
                        "read",
                        "write"
                    ],
                    "wsplcd": [
                        "read",
                        "write"
                    ]
                }
            },
            "data": {
                "username": "root"
            }
        }
    ]
}

get_timeout_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"ae7dc866-a3c7-41b3-884a-af62172067c5",
    "params":[
        "af85028de1f19747fc33e59b4e89d989",
        "session",
        "get_timeout",
        {}
    ]
}

get_timeout_response = {
    "jsonrpc": "2.0",
    "id": "ae7dc866-a3c7-41b3-884a-af62172067c5",
    "result": [
        0,
        {
            "ubus_rpc_session": "af85028de1f19747fc33e59b4e89d989",
            "timeout": 900,
            "expires": 879
        }
    ]
}

XXX

get_device_name_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"a6586d0c-158f-44cf-a695-4d404de82f51",
    "params":[
        "00000000000000000000000000000000",
        "device_name",
        "get",
        {}
    ]
}

get_device_name_response = {
    "jsonrpc": "2.0",
    "id": "a6586d0c-158f-44cf-a695-4d404de82f51",
    "result": [
        0,
        {
            "device_name": "devolo-444"
        }
    ]
}

get_timeout_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"5668521e-d121-4f24-b5fb-d9c9202f345c",
    "params":[
        "af85028de1f19747fc33e59b4e89d989",
        "session",
        "get_timeout",
        {}
    ]
}

get_timeout_response = {
    "jsonrpc": "2.0",
    "id": "5668521e-d121-4f24-b5fb-d9c9202f345c",
    "result": [
        0,
        {
            "ubus_rpc_session": "af85028de1f19747fc33e59b4e89d989",
            "timeout": 900,
            "expires": 879
        }
    ]
}

uci_get_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"27370bf8-5fda-477c-a565-73a34eee7f42",
    "params":[
        "af85028de1f19747fc33e59b4e89d989",
        "uci",
        "get",
        {"config":"upgrade"}
    ]
}

uci_get_response = {
    "jsonrpc": "2.0",
    "id": "27370bf8-5fda-477c-a565-73a34eee7f42",
    "result": [
        0,
        {
            "values": {
                "acs": {
                    ".anonymous": false,
                    ".type": "system",
                    ".name": "acs",
                    ".index": 0,
                    "upgrades_managed": "0"
                }
            }
        }
    ]
}

system_board_request = [
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"d4e6e268-25a7-4791-94b9-f044fc1f80e0",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "system",
            "board",
            {}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"a0c3cde1-4da1-4d72-94f3-cc30871a971a",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "system.management",
            "version",
            {}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"c6cbad3c-6092-4532-907f-e2baa02c7b17",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "uci",
            "get",
            {
                "config":"system",
                "section":"@system[0]"
            }
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"c450c58e-e8ae-4435-9d61-731dad3f4f5f",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "uci",
            "state",
            {
                "config":"delos",
                "section":"baptization",
                "option":"SerialNumber"
            }
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"fcad21fc-5e58-49fd-ad9e-caa1b8ba58cf",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "device_name",
            "get",
            {}
        ]
    }
]

system_board_response = [
    {
        "jsonrpc": "2.0",
        "id": "d4e6e268-25a7-4791-94b9-f044fc1f80e0",
        "result": [
            0,
            {
                "kernel": "4.4.60",
                "hostname": "devolo-444",
                "system": "ARMv7 Processor rev 5 (v7l)",
                "model": "DVL dlan2-2400-ac",
                "release": {
                    "distribution": "delos",
                    "version": "Chaos Calmer",
                    "revision": "13d725f+r49254",
                    "codename": "chaos_calmer",
                    "target": "ipq/ipq40xx",
                    "description": "delos Chaos Calmer 15.05.1"
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "a0c3cde1-4da1-4d72-94f3-cc30871a971a",
        "result": [
            0,
            {
                "version": "6.0.1",
                "date": "2023-09-06",
                "commit": "13d725f282728d770533ef3233d063e6caf6f59c",
                "buildNumber": "R57"
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "c6cbad3c-6092-4532-907f-e2baa02c7b17",
        "result": [
            0,
            {
                "values": {
                    ".anonymous": true,
                    ".type": "system",
                    ".name": "cfg01e48a",
                    "log_size": "64",
                    "hostname": "devolo-444",
                    "zonename": "Europe/Berlin",
                    "log_buffer_size": "512",
                    "log_type": "circular_file",
                    "log_webui": "/www/app/components/status/logs/log",
                    "timezone": "CET-1CEST,M3.5.0,M10.5.0/3"
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "c450c58e-e8ae-4435-9d61-731dad3f4f5f",
        "result": [
            0,
            {
                "value": "2304271431003444"
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "fcad21fc-5e58-49fd-ad9e-caa1b8ba58cf",
        "result": [
            0,
            {
                "device_name": "devolo-444"
            }
        ]
    }
]

request = {
    "jsonrpc": "2.0",
    "id": "dc6d97f0-f4f2-408c-b93c-34a363317a32",
    "result": [
        0,
        {
            "ports": [
                {
                    "link": true,
                    "rx_flow_control": true,
                    "tx_flow_control": true,
                    "full_duplex": true,
                    "auto_negotiation": false,
                    "speed": 1000
                },
                {
                    "link": false,
                    "rx_flow_control": false,
                    "tx_flow_control": false,
                    "full_duplex": false,
                    "auto_negotiation": false,
                    "speed": 0
                },
                {
                    "link": false,
                    "rx_flow_control": false,
                    "tx_flow_control": false,
                    "full_duplex": false,
                    "auto_negotiation": false,
                    "speed": 0
                },
                {
                    "link": false,
                    "rx_flow_control": false,
                    "tx_flow_control": false,
                    "full_duplex": false,
                    "auto_negotiation": false,
                    "speed": 0
                },
                {
                    "link": true,
                    "rx_flow_control": false,
                    "tx_flow_control": false,
                    "full_duplex": true,
                    "auto_negotiation": false,
                    "speed": 1000
                },
                {
                    "link": false,
                    "rx_flow_control": false,
                    "tx_flow_control": false,
                    "full_duplex": false,
                    "auto_negotiation": false,
                    "speed": 0
                }
            ]
        }
    ]
}

request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"481b9551-2e03-4af8-a7da-b58ddace8d2b",
    "params":[
        "00000000000000000000000000000000",
        "session",
        "login",
        {
            "username":"root",
            "password":"",
            "timeout":900
        }
    ]
}

response = {
    "jsonrpc": "2.0",
    "id": "a6586d0c-158f-44cf-a695-4d404de82f51",
    "result": [
        0,
        {
            "device_name": "devolo-444"
        }
    ]
}

request = {
    "jsonrpc": "2.0",
    "id": "a6586d0c-158f-44cf-a695-4d404de82f51",
    "result": [
        0,
        {
            "device_name": "devolo-444"
        }
    ]
}

response = {{
    "jsonrpc": "2.0",
    "id": "27370bf8-5fda-477c-a565-73a34eee7f42",
    "result": [
        0,
        {
            "values": {
                "acs": {
                    ".anonymous": false,
                    ".type": "system",
                    ".name": "acs",
                    ".index": 0,
                    "upgrades_managed": "0"
                }
            }
        }
    ]
}

request = [
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"d4e6e268-25a7-4791-94b9-f044fc1f80e0",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "system",
            "board",
            {}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"a0c3cde1-4da1-4d72-94f3-cc30871a971a",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "system.management",
            "version",
            {}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"c6cbad3c-6092-4532-907f-e2baa02c7b17",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "uci",
            "get",
            {"config":"system","section":"@system[0]"}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"c450c58e-e8ae-4435-9d61-731dad3f4f5f",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "uci",
            "state",
            {"config":"delos","section":"baptization","option":"SerialNumber"}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"fcad21fc-5e58-49fd-ad9e-caa1b8ba58cf",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "device_name",
            "get",
            {}
        ]
    }
]

response = [
    {
        "jsonrpc": "2.0",
        "id": "d4e6e268-25a7-4791-94b9-f044fc1f80e0",
        "result": [
            0,
            {
                "kernel": "4.4.60",
                "hostname": "devolo-444",
                "system": "ARMv7 Processor rev 5 (v7l)",
                "model": "DVL dlan2-2400-ac",
                "release": {
                    "distribution": "delos",
                    "version": "Chaos Calmer",
                    "revision": "13d725f+r49254",
                    "codename": "chaos_calmer",
                    "target": "ipq/ipq40xx",
                    "description": "delos Chaos Calmer 15.05.1"
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "a0c3cde1-4da1-4d72-94f3-cc30871a971a",
        "result": [
            0,
            {
                "version": "6.0.1",
                "date": "2023-09-06",
                "commit": "13d725f282728d770533ef3233d063e6caf6f59c",
                "buildNumber": "R57"
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "c6cbad3c-6092-4532-907f-e2baa02c7b17",
        "result": [
            0,
            {
                "values": {
                    ".anonymous": true,
                    ".type": "system",
                    ".name": "cfg01e48a",
                    "log_size": "64",
                    "hostname": "devolo-444",
                    "zonename": "Europe/Berlin",
                    "log_buffer_size": "512",
                    "log_type": "circular_file",
                    "log_webui": "/www/app/components/status/logs/log",
                    "timezone": "CET-1CEST,M3.5.0,M10.5.0/3"
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "c450c58e-e8ae-4435-9d61-731dad3f4f5f",
        "result": [
            0,
            {
                "value": "2304271431003444"
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "fcad21fc-5e58-49fd-ad9e-caa1b8ba58cf",
        "result": [
            0,
            {
                "device_name": "devolo-444"
            }
        ]
    }
]

request = {"jsonrpc":"2.0","method":"call","id":"ed6899a2-306d-476c-b4f9-9955d1136e1e","params":["af85028de1f19747fc33e59b4e89d989","network.device","status",{"name":"br-lan"}]}

response = {
    "jsonrpc": "2.0",
    "id": "ed6899a2-306d-476c-b4f9-9955d1136e1e",
    "result": [
        0,
        {
            "external": false,
            "present": true,
            "type": "Bridge",
            "up": true,
            "carrier": true,
            "bridge-members": [
                "ath0",
                "ath1",
                "eth0"
            ],
            "mtu": 1500,
            "mtu6": 1500,
            "macaddr": "88:fc:a6:13:8f:3f",
            "txqueuelen": 1000,
            "ipv6": true,
            "promisc": false,
            "rpfilter": 0,
            "acceptlocal": false,
            "igmpversion": 0,
            "mldversion": 0,
            "neigh4reachabletime": 30000,
            "neigh6reachabletime": 30000,
            "dadtransmits": 1,
            "statistics": {
                "collisions": 0,
                "rx_frame_errors": 0,
                "tx_compressed": 0,
                "multicast": 0,
                "rx_length_errors": 0,
                "tx_dropped": 0,
                "rx_bytes": 884032063,
                "rx_missed_errors": 0,
                "tx_errors": 0,
                "rx_compressed": 0,
                "rx_over_errors": 0,
                "tx_fifo_errors": 0,
                "rx_crc_errors": 0,
                "rx_packets": 3725232,
                "tx_heartbeat_errors": 0,
                "rx_dropped": 0,
                "tx_aborted_errors": 0,
                "tx_packets": 1065307,
                "rx_errors": 0,
                "tx_bytes": 308836847,
                "tx_window_errors": 0,
                "rx_fifo_errors": 0,
                "tx_carrier_errors": 0
            }
        }
    ]
}

request = [{"jsonrpc":"2.0","method":"call","id":"d37aa973-93a5-4761-8cba-8c5ab7a009cc","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","section":"guest_wifi"}]},{"jsonrpc":"2.0","method":"call","id":"5f62a831-b483-41dc-b24f-72f1b24c138f","params":["af85028de1f19747fc33e59b4e89d989","system","info",{}]}]

response = [
    {
        "jsonrpc": "2.0",
        "id": "d37aa973-93a5-4761-8cba-8c5ab7a009cc",
        "result": [
            0,
            {
                "values": {
                    ".anonymous": false,
                    ".type": "guest_wifi",
                    ".name": "guest_wifi",
                    "auto_switch_off": "0",
                    "interval": "00:30"
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "5f62a831-b483-41dc-b24f-72f1b24c138f",
        "result": [
            0,
            {
                "uptime": 266850,
                "localtime": 1752087627,
                "load": [
                    30560,
                    40352,
                    44864
                ],
                "memory": {
                    "total": 253734912,
                    "free": 92524544,
                    "shared": 405504,
                    "buffered": 8437760
                },
                "swap": {
                    "total": 0,
                    "free": 0
                }
            }
        ]
    }
]

request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"5aee4574-6d35-4dc2-a168-28b850d2a7a9",
    "params":[
        "af85028de1f19747fc33e59b4e89d989",
        "uci",
        "get",
        {"config":"vlan","type":"vlan"}
    ]
}

response = {
    "jsonrpc": "2.0",
    "id": "5aee4574-6d35-4dc2-a168-28b850d2a7a9",
    "result": [
        0,
        {
            "values": {}
        }
    ]
}

request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"e38786d0-23f6-4602-a975-a7dfe61275f5",
    "params":[
        "af85028de1f19747fc33e59b4e89d989",
        "system",
        "info",
        {}
    ]
}

response = {
    "jsonrpc": "2.0",
    "id": "e38786d0-23f6-4602-a975-a7dfe61275f5",
    "result": [
        0,
        {
            "uptime": 266850,
            "localtime": 1752087627,
            "load": [
                30560,
                40352,
                44864
            ],
            "memory": {
                "total": 253734912,
                "free": 92508160,
                "shared": 405504,
                "buffered": 8437760
            },
            "swap": {
                "total": 0,
                "free": 0
            }
        }
    ]
}

request = [
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"3ddedffa-8df6-42a4-9ba6-7c4437788d6c",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "network.info",
            "radio_state",
            {}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"c28fe4b5-d879-4b56-b863-5a9b8057a247",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "iwinfo",
            "devices",
            {}
        ]
    },
    {
        "jsonrpc":"2.0",
        "method":"call",
        "id":"975ad5b1-cdad-4321-aebd-dd91922d2e26",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "uci",
            "get",
            {
                "config":"wireless",
                "type":"wifi-iface",
                "match":{"mode":"ap"}
            }
        ]
    },{
        "jsonrpc":"2.0",
        "method":"call",
        "id":"6a62e873-54c8-4929-b8de-41f4ed97cc81",
        "params":[
            "af85028de1f19747fc33e59b4e89d989",
            "uci","get",{"config":"wireless","type":"wifi-iface","match":{"mode":"sta"}}]},{"jsonrpc":"2.0","method":"call","id":"44a7f854-1c7c-4a91-8e67-c6b1700309fd","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"vlan","type":"vlan"}]},{"jsonrpc":"2.0","method":"call","id":"b04b85f2-cf5a-43d7-8f4a-1f2aede34061","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-device"}]}]

response = [
    {
        "jsonrpc": "2.0",
        "id": "3ddedffa-8df6-42a4-9ba6-7c4437788d6c",
        "result": [
            0,
            {
                "wifi0": {
                    "frequency": 2412,
                    "channel": 1,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi0",
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    }
                },
                "wifi1": {
                    "frequency": 5500,
                    "channel": 100,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi1",
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "c28fe4b5-d879-4b56-b863-5a9b8057a247",
        "result": [
            0,
            {
                "devices": [
                    "wifi1",
                    "wifi0",
                    "ath0",
                    "ath1"
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "975ad5b1-cdad-4321-aebd-dd91922d2e26",
        "result": [
            0,
            {
                "values": {
                    "cfg023579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg023579",
                        ".index": 1,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg043579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg043579",
                        ".index": 3,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg083579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg083579",
                        ".index": 7,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    },
                    "cfg093579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg093579",
                        ".index": 8,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "6a62e873-54c8-4929-b8de-41f4ed97cc81",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "44a7f854-1c7c-4a91-8e67-c6b1700309fd",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "b04b85f2-cf5a-43d7-8f4a-1f2aede34061",
        "result": [
            0,
            {
                "values": {
                    "wifi0": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi0",
                        ".index": 0,
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    },
                    "wifi1": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi1",
                        ".index": 2,
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    }
]

request = [{"jsonrpc":"2.0","method":"call","id":"98d2cded-e7b5-4427-85fa-45afc7e03221","params":["af85028de1f19747fc33e59b4e89d989","network.ghntool","ghninfo",{}]},{"jsonrpc":"2.0","method":"call","id":"7f8b0faf-a05c-4582-bd27-7983bb372be5","params":["af85028de1f19747fc33e59b4e89d989","network.ghntool","get_settings",{}]}]

response = [
    {
        "jsonrpc": "2.0",
        "id": "98d2cded-e7b5-4427-85fa-45afc7e03221",
        "result": [
            0,
            {
                "device_id": "3",
                "devices": [
                    {
                        "did": "1",
                        "mac": "88:FC:A6:21:81:04",
                        "rx": "589",
                        "tx": "452",
                        "role": "DOMAIN_MASTER"
                    },
                    {
                        "did": "2",
                        "mac": "88:FC:A6:13:7C:54",
                        "rx": "135",
                        "tx": "120",
                        "role": "END_POINT"
                    },
                    {
                        "did": "3",
                        "mac": "88:FC:A6:13:8F:41",
                        "role": "END_POINT"
                    },
                    {
                        "did": "4",
                        "mac": "B8:BE:F4:F2:A5:39",
                        "rx": "177",
                        "tx": "105",
                        "role": "END_POINT"
                    }
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "7f8b0faf-a05c-4582-bd27-7983bb372be5",
        "result": [
            0,
            {
                "disabled": "0",
                "state": "0",
                "domain_name": "DjN8Mm815JLgSQSsarV6WXoQXbTfgunL",
                "dm_selection_node_type": "DM_AT_GW",
                "profile": "7"
            }
        ]
    }
]

network_interface_dump_request = [{"jsonrpc":"2.0","method":"call","id":"096ca0e3-e383-49f7-ad34-104e0d0f526b","params":["af85028de1f19747fc33e59b4e89d989","network.interface","dump",{}]},{"jsonrpc":"2.0","method":"call","id":"63bf874c-97bb-4121-8325-12f140d539ae","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"vlan"}]}]

network_interface_dump_response = [
    {
        "jsonrpc": "2.0",
        "id": "096ca0e3-e383-49f7-ad34-104e0d0f526b",
        "result": [
            0,
            {
                "interface": [
                    {
                        "interface": "lan",
                        "up": true,
                        "pending": false,
                        "available": true,
                        "autostart": true,
                        "dynamic": false,
                        "uptime": 266776,
                        "l3_device": "br-lan",
                        "proto": "dhcp",
                        "device": "br-lan",
                        "metric": 0,
                        "delegation": true,
                        "ipv4-address": [
                            {
                                "address": "192.168.1.95",
                                "mask": 24
                            }
                        ],
                        "ipv6-address": [],
                        "ipv6-prefix": [],
                        "ipv6-prefix-assignment": [],
                        "route": [
                            {
                                "target": "192.168.1.1",
                                "mask": 32,
                                "nexthop": "0.0.0.0",
                                "source": "192.168.1.95/32"
                            },
                            {
                                "target": "0.0.0.0",
                                "mask": 0,
                                "nexthop": "192.168.1.1",
                                "source": "192.168.1.95/32"
                            }
                        ],
                        "dns-server": [
                            "192.168.1.1"
                        ],
                        "dns-search": [],
                        "inactive": {
                            "ipv4-address": [],
                            "ipv6-address": [],
                            "route": [],
                            "dns-server": [],
                            "dns-search": []
                        },
                        "data": {
                            "hostname": "devolo-444",
                            "leasetime": 86400,
                            "ntpserver": "192.168.1.1"
                        }
                    },
                    {
                        "interface": "lan6",
                        "up": true,
                        "pending": false,
                        "available": true,
                        "autostart": true,
                        "dynamic": false,
                        "uptime": 266584,
                        "l3_device": "br-lan",
                        "proto": "dhcpv6",
                        "device": "br-lan",
                        "metric": 0,
                        "delegation": true,
                        "ipv4-address": [],
                        "ipv6-address": [
                            {
                                "address": "2a02:8429:75d2:4401:f3d:80e7:2f50:53ff",
                                "mask": 128,
                                "preferred": 63443,
                                "valid": 63443
                            }
                        ],
                        "ipv6-prefix": [],
                        "ipv6-prefix-assignment": [],
                        "route": [
                            {
                                "target": "::",
                                "mask": 0,
                                "nexthop": "fe80::46ce:7dff:fea3:1b40",
                                "metric": 384,
                                "valid": 1543,
                                "source": "2a02:8429:75d2:4401:f3d:80e7:2f50:53ff/128"
                            }
                        ],
                        "dns-server": [
                            "2a02:8429:75d2:4401::1"
                        ],
                        "dns-search": [],
                        "inactive": {
                            "ipv4-address": [],
                            "ipv6-address": [],
                            "route": [],
                            "dns-server": [],
                            "dns-search": []
                        },
                        "data": {
                            "passthru": "003800102a02842975d244010000000000000001001700102a02842975d244010000000000000001"
                        }
                    },
                    {
                        "interface": "lan_autoip",
                        "up": false,
                        "pending": true,
                        "available": true,
                        "autostart": true,
                        "dynamic": false,
                        "proto": "autoip",
                        "device": "br-lan",
                        "data": {}
                    },
                    {
                        "interface": "loopback",
                        "up": true,
                        "pending": false,
                        "available": true,
                        "autostart": true,
                        "dynamic": false,
                        "uptime": 266782,
                        "l3_device": "lo",
                        "proto": "static",
                        "device": "lo",
                        "updated": [
                            "addresses"
                        ],
                        "metric": 0,
                        "delegation": true,
                        "ipv4-address": [
                            {
                                "address": "127.0.0.1",
                                "mask": 8
                            }
                        ],
                        "ipv6-address": [],
                        "ipv6-prefix": [],
                        "ipv6-prefix-assignment": [],
                        "route": [],
                        "dns-server": [],
                        "dns-search": [],
                        "inactive": {
                            "ipv4-address": [],
                            "ipv6-address": [],
                            "route": [],
                            "dns-server": [],
                            "dns-search": []
                        },
                        "data": {}
                    }
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "63bf874c-97bb-4121-8325-12f140d539ae",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    }
]

network_swconfig_list_request = {
    "jsonrpc":"2.0",
    "method":"call","id":"ca3b5738-e1ab-4955-b766-2504b0c041f3","params":["af85028de1f19747fc33e59b4e89d989","network.swconfig","list",{}]}

network_swconfig_list_response = {
    "jsonrpc": "2.0",
    "id": "ca3b5738-e1ab-4955-b766-2504b0c041f3",
    "result": [
        0,
        {
            "switches": [
                "QCA DESS"
            ]
        }
    ]
}

uci_state_calibration_check_request = {"jsonrpc":"2.0","method":"call","id":"0d752e99-4aac-4829-be7b-35efb261d5e8","params":["af85028de1f19747fc33e59b4e89d989","uci","state",{"config":"delos","section":"calibration_check"}]}

uci_state_calibration_check_response = {
    "jsonrpc": "2.0",
    "id": "0d752e99-4aac-4829-be7b-35efb261d5e8",
    "result": [
        0,
        {
            "values": {
                ".anonymous": false,
                ".type": "calibration_check",
                ".name": "calibration_check",
                "result": "ok"
            }
        }
    ]
}

uci_state_baptization_check_request = {"jsonrpc":"2.0","method":"call","id":"b095fb7e-734f-4fca-956d-10df812d3602","params":["af85028de1f19747fc33e59b4e89d989","uci","state",{"config":"delos","section":"baptization_check"}]}

uci_state_baptization_check_response = {
    "jsonrpc": "2.0",
    "id": "b095fb7e-734f-4fca-956d-10df812d3602",
    "result": [
        0,
        {
            "values": {
                ".anonymous": false,
                ".type": "baptization_check",
                ".name": "baptization_check",
                "result": "ok"
            }
        }
    ]
}

fwuagent_get_deployment_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"b22ad86e-0276-4498-85a7-6089d651eb93",
    "params":["af85028de1f19747fc33e59b4e89d989","fwuagent","get_deployment",{}]}

fwuagent_get_deployment_response = {
    "jsonrpc": "2.0",
    "id": "b22ad86e-0276-4498-85a7-6089d651eb93",
    "result": [
        0,
        {
            "last_poll": "2025-07-09T17:01:23Z",
            "message": "no pending deployment",
            "success": false
        }
    ]
}

fwuagent_get_service_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"7b30ccc3-b896-4710-ab2c-b59eb3f5c671",
    "params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"fwuagent","section":"service"}]}

fwuagent_get_service_response = {
    "jsonrpc": "2.0",
    "id": "7b30ccc3-b896-4710-ab2c-b59eb3f5c671",
    "result": [
        0,
        {
            "values": {
                ".anonymous": false,
                ".type": "service",
                ".name": "service",
                "disabled": "0",
                "log_level": "INFO",
                "automatic_update": "1",
                "ghn_agents": "0",
                "rebooted": "0"
            }
        }
    ]
}

network_swconfig_status_request = [{
    "jsonrpc":"2.0",
    "method":"call",
    "id":"dc6d97f0-f4f2-408c-b93c-34a363317a32",
    "params":[
        "af85028de1f19747fc33e59b4e89d989",
        "network.swconfig",
        "status",
        {"switch":"QCA DESS"}
    ]
}]

network_swconfig_status_response = [
    {
        "jsonrpc": "2.0",
        "id": "dc6d97f0-f4f2-408c-b93c-34a363317a32",
        "result": [
            0,
            {
                "ports": [
                    {
                        "link": true,
                        "rx_flow_control": true,
                        "tx_flow_control": true,
                        "full_duplex": true,
                        "auto_negotiation": false,
                        "speed": 1000
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": true,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": true,
                        "auto_negotiation": false,
                        "speed": 1000
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    }
                ]
            }
        ]
    }
]

network_info_clients_request = [{"jsonrpc":"2.0","method":"call","id":"aa062975-454d-4d03-983e-326a81863839","params":["af85028de1f19747fc33e59b4e89d989","network.info","clients",{"device":"ath0"}]},{"jsonrpc":"2.0","method":"call","id":"5b98d682-83f8-409f-b32c-c634fe7d8034","params":["af85028de1f19747fc33e59b4e89d989","network.info","clients",{"device":"ath1"}]}]

network_info_clients_response = [
    {
        "jsonrpc": "2.0",
        "id": "aa062975-454d-4d03-983e-326a81863839",
        "result": [
            0,
            {
                "clients": {
                    "B8:D6:1A:86:CA:C0": {
                        "connected_time": 5828,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 1000
                        },
                        "tx": {
                            "rate": 43000
                        }
                    },
                    "2C:BC:BB:9F:B8:34": {
                        "connected_time": 68351,
                        "rx": {
                            "rate": 6000
                        },
                        "tx": {
                            "rate": 52000
                        }
                    },
                    "08:B6:1F:D1:41:E8": {
                        "connected_time": 225001,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 6000
                        },
                        "tx": {
                            "rate": 57000
                        }
                    },
                    "AC:41:6A:59:0E:D7": {
                        "connected_time": 266707,
                        "rx": {
                            "rate": 1000
                        },
                        "tx": {
                            "rate": 72000
                        },
                        "ipaddr": "192.168.1.81"
                    },
                    "08:B6:1F:CF:E6:C0": {
                        "connected_time": 266712,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    },
                    "08:B6:1F:D9:07:30": {
                        "connected_time": 266712,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    },
                    "B0:81:84:A5:3F:24": {
                        "connected_time": 266721,
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "5b98d682-83f8-409f-b32c-c634fe7d8034",
        "result": [
            0,
            {
                "clients": {}
            }
        ]
    }
]

iwinfo_info_request = {"jsonrpc":"2.0","method":"call","id":"d2451a15-6e0f-4d8c-a237-46a043758e0e","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","info",{"device":"ath0"}]}

iwinfo_info_response = {
    "jsonrpc": "2.0",
    "id": "d2451a15-6e0f-4d8c-a237-46a043758e0e",
    "result": [
        0,
        {
            "phy": "wifi0",
            "ssid": "devolo-377",
            "bssid": "88:FC:A6:13:8F:3D",
            "mode": "Master",
            "channel": 1,
            "frequency": 2412,
            "txpower": 17,
            "quality": 0,
            "quality_max": 94,
            "signal": -99,
            "noise": -99,
            "bitrate": 192000,
            "encryption": {
                "enabled": true,
                "wpa": [
                    2
                ],
                "authentication": [
                    "psk"
                ],
                "ciphers": [
                    "ccmp"
                ]
            },
            "hwmodes": [
                "b",
                "g",
                "n"
            ],
            "hardware": {
                "name": "Generic Atheros"
            }
        }
    ]
}

iwinfo_info_request = {"jsonrpc":"2.0","method":"call","id":"ae856832-302b-40a1-9226-02d40ad098c9","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","info",{"device":"ath1"}]}

iwinfo_info_response = {
    "jsonrpc": "2.0",
    "id": "ae856832-302b-40a1-9226-02d40ad098c9",
    "result": [
        0,
        {
            "phy": "wifi1",
            "ssid": "devolo-377",
            "bssid": "88:FC:A6:13:8F:3E",
            "mode": "Master",
            "channel": 100,
            "frequency": 5500,
            "txpower": 23,
            "quality": 0,
            "quality_max": 94,
            "signal": -105,
            "noise": -105,
            "bitrate": 866700,
            "encryption": {
                "enabled": true,
                "wpa": [
                    2
                ],
                "authentication": [
                    "psk"
                ],
                "ciphers": [
                    "ccmp"
                ]
            },
            "hwmodes": [
                "ac",
                "a",
                "n"
            ],
            "hardware": {
                "name": "Generic Atheros"
            }
        }
    ]
}

system_info_request = {"jsonrpc":"2.0","method":"call","id":"1d663e90-00b7-4855-815b-0130a846c610","params":["af85028de1f19747fc33e59b4e89d989","system","info",{}]}

system_info_response = {
    "jsonrpc": "2.0",
    "id": "1d663e90-00b7-4855-815b-0130a846c610",
    "result": [
        0,
        {
            "uptime": 266861,
            "localtime": 1752087637,
            "load": [
                25824,
                39008,
                44352
            ],
            "memory": {
                "total": 253734912,
                "free": 92942336,
                "shared": 405504,
                "buffered": 8437760
            },
            "swap": {
                "total": 0,
                "free": 0
            }
        }
    ]
}

network_info_radio_state_request = [{"jsonrpc":"2.0","method":"call","id":"2ef3a3e2-240b-4058-bcd2-cda6f54ac4c1","params":["af85028de1f19747fc33e59b4e89d989","network.info","radio_state",{}]},{"jsonrpc":"2.0","method":"call","id":"99508956-0709-4d45-a169-b5a27407ace0","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","devices",{}]},{"jsonrpc":"2.0","method":"call","id":"9bbf15b7-514f-4ed2-a77e-1c82148c1a19","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-iface","match":{"mode":"ap"}}]},{"jsonrpc":"2.0","method":"call","id":"f685dddf-6bf8-4b2a-b75d-61ef705dfa67","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-iface","match":{"mode":"sta"}}]},{"jsonrpc":"2.0","method":"call","id":"afabd07d-6573-4717-9229-8f5b3d454b7b","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"vlan","type":"vlan"}]},{"jsonrpc":"2.0","method":"call","id":"c936d895-548a-4458-bb9a-b6602f561e8c","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-device"}]}]

network_info_radio_state_response = [
    {
        "jsonrpc": "2.0",
        "id": "2ef3a3e2-240b-4058-bcd2-cda6f54ac4c1",
        "result": [
            0,
            {
                "wifi0": {
                    "frequency": 2412,
                    "channel": 1,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi0",
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    }
                },
                "wifi1": {
                    "frequency": 5500,
                    "channel": 100,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi1",
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "99508956-0709-4d45-a169-b5a27407ace0",
        "result": [
            0,
            {
                "devices": [
                    "wifi1",
                    "wifi0",
                    "ath0",
                    "ath1"
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "9bbf15b7-514f-4ed2-a77e-1c82148c1a19",
        "result": [
            0,
            {
                "values": {
                    "cfg023579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg023579",
                        ".index": 1,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg043579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg043579",
                        ".index": 3,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg083579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg083579",
                        ".index": 7,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    },
                    "cfg093579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg093579",
                        ".index": 8,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "f685dddf-6bf8-4b2a-b75d-61ef705dfa67",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "afabd07d-6573-4717-9229-8f5b3d454b7b",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "c936d895-548a-4458-bb9a-b6602f561e8c",
        "result": [
            0,
            {
                "values": {
                    "wifi0": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi0",
                        ".index": 0,
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    },
                    "wifi1": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi1",
                        ".index": 2,
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    }
]

network_ghntool_ghninfo_request = [{"jsonrpc":"2.0","method":"call","id":"81aaca36-7e46-4bbb-bd8e-efca1af07c05","params":["af85028de1f19747fc33e59b4e89d989","network.ghntool","ghninfo",{}]},{"jsonrpc":"2.0","method":"call","id":"d748dcb0-0cd4-4db9-8546-80a245119e50","params":["af85028de1f19747fc33e59b4e89d989","network.ghntool","get_settings",{}]}]

network_ghntool_ghninfo_response = [
    {
        "jsonrpc": "2.0",
        "id": "81aaca36-7e46-4bbb-bd8e-efca1af07c05",
        "result": [
            0,
            {
                "device_id": "3",
                "devices": [
                    {
                        "did": "1",
                        "mac": "88:FC:A6:21:81:04",
                        "rx": "589",
                        "tx": "452",
                        "role": "DOMAIN_MASTER"
                    },
                    {
                        "did": "2",
                        "mac": "88:FC:A6:13:7C:54",
                        "rx": "135",
                        "tx": "120",
                        "role": "END_POINT"
                    },
                    {
                        "did": "3",
                        "mac": "88:FC:A6:13:8F:41",
                        "role": "END_POINT"
                    },
                    {
                        "did": "4",
                        "mac": "B8:BE:F4:F2:A5:39",
                        "rx": "177",
                        "tx": "105",
                        "role": "END_POINT"
                    }
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "d748dcb0-0cd4-4db9-8546-80a245119e50",
        "result": [
            0,
            {
                "disabled": "0",
                "state": "0",
                "domain_name": "DjN8Mm815JLgSQSsarV6WXoQXbTfgunL",
                "dm_selection_node_type": "DM_AT_GW",
                "profile": "7"
            }
        ]
    }
]

network_swconfig_list_request = {"jsonrpc":"2.0","method":"call","id":"73cc88cb-b961-456e-88fe-3bb751a76566","params":["af85028de1f19747fc33e59b4e89d989","network.swconfig","list",{}]}

network_swconfig_list_response = {
    "jsonrpc": "2.0",
    "id": "73cc88cb-b961-456e-88fe-3bb751a76566",
    "result": [
        0,
        {
            "switches": [
                "QCA DESS"
            ]
        }
    ]
}

network_swconfig_status_request = [{"jsonrpc":"2.0","method":"call","id":"e021bf4c-3afc-4371-b175-8f33ab64e430","params":["af85028de1f19747fc33e59b4e89d989","network.swconfig","status",{"switch":"QCA DESS"}]}]

network_swconfig_status_response = [
    {
        "jsonrpc": "2.0",
        "id": "e021bf4c-3afc-4371-b175-8f33ab64e430",
        "result": [
            0,
            {
                "ports": [
                    {
                        "link": true,
                        "rx_flow_control": true,
                        "tx_flow_control": true,
                        "full_duplex": true,
                        "auto_negotiation": false,
                        "speed": 1000
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": true,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": true,
                        "auto_negotiation": false,
                        "speed": 1000
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    }
                ]
            }
        ]
    }
]

network_info_clients_request = [{"jsonrpc":"2.0","method":"call","id":"c5187748-d714-4b04-9f15-a621f65d3103","params":["af85028de1f19747fc33e59b4e89d989","network.info","clients",{"device":"ath0"}]},{"jsonrpc":"2.0","method":"call","id":"0c5841b1-c485-4c69-9b85-28659e00b15e","params":["af85028de1f19747fc33e59b4e89d989","network.info","clients",{"device":"ath1"}]}]

network_info_clients_response = [
    {
        "jsonrpc": "2.0",
        "id": "c5187748-d714-4b04-9f15-a621f65d3103",
        "result": [
            0,
            {
                "clients": {
                    "B8:D6:1A:86:CA:C0": {
                        "connected_time": 5838,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 6000
                        },
                        "tx": {
                            "rate": 43000
                        }
                    },
                    "2C:BC:BB:9F:B8:34": {
                        "connected_time": 68361,
                        "rx": {
                            "rate": 6000
                        },
                        "tx": {
                            "rate": 52000
                        }
                    },
                    "08:B6:1F:D1:41:E8": {
                        "connected_time": 225011,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 58000
                        },
                        "tx": {
                            "rate": 57000
                        }
                    },
                    "AC:41:6A:59:0E:D7": {
                        "connected_time": 266717,
                        "rx": {
                            "rate": 65000
                        },
                        "tx": {
                            "rate": 72000
                        },
                        "ipaddr": "192.168.1.81"
                    },
                    "08:B6:1F:CF:E6:C0": {
                        "connected_time": 266722,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    },
                    "08:B6:1F:D9:07:30": {
                        "connected_time": 266722,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    },
                    "B0:81:84:A5:3F:24": {
                        "connected_time": 266731,
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "0c5841b1-c485-4c69-9b85-28659e00b15e",
        "result": [
            0,
            {
                "clients": {}
            }
        ]
    }
]

iwinfo_info_request = {"jsonrpc":"2.0","method":"call","id":"71c69278-bdac-4117-894b-bdc77e3b7091","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","info",{"device":"ath0"}]}

iwinfo_info_response = {
    "jsonrpc": "2.0",
    "id": "71c69278-bdac-4117-894b-bdc77e3b7091",
    "result": [
        0,
        {
            "phy": "wifi0",
            "ssid": "devolo-377",
            "bssid": "88:FC:A6:13:8F:3D",
            "mode": "Master",
            "channel": 1,
            "frequency": 2412,
            "txpower": 17,
            "quality": 0,
            "quality_max": 94,
            "signal": -99,
            "noise": -99,
            "bitrate": 192000,
            "encryption": {
                "enabled": true,
                "wpa": [
                    2
                ],
                "authentication": [
                    "psk"
                ],
                "ciphers": [
                    "ccmp"
                ]
            },
            "hwmodes": [
                "b",
                "g",
                "n"
            ],
            "hardware": {
                "name": "Generic Atheros"
            }
        }
    ]
}

iwinfo_info_request = {"jsonrpc":"2.0","method":"call","id":"c918ab36-3908-497f-b502-12e1d84d4568","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","info",{"device":"ath1"}]}

iwinfo_info_response = {
    "jsonrpc": "2.0",
    "id": "c918ab36-3908-497f-b502-12e1d84d4568",
    "result": [
        0,
        {
            "phy": "wifi1",
            "ssid": "devolo-377",
            "bssid": "88:FC:A6:13:8F:3E",
            "mode": "Master",
            "channel": 100,
            "frequency": 5500,
            "txpower": 23,
            "quality": 0,
            "quality_max": 94,
            "signal": -105,
            "noise": -105,
            "bitrate": 866700,
            "encryption": {
                "enabled": true,
                "wpa": [
                    2
                ],
                "authentication": [
                    "psk"
                ],
                "ciphers": [
                    "ccmp"
                ]
            },
            "hwmodes": [
                "ac",
                "a",
                "n"
            ],
            "hardware": {
                "name": "Generic Atheros"
            }
        }
    ]
}

system_info_request = {"jsonrpc":"2.0","method":"call","id":"76be4658-8f5f-4542-866e-de2951ec5ec3","params":["af85028de1f19747fc33e59b4e89d989","system","info",{}]}

system_info_response = {
    "jsonrpc": "2.0",
    "id": "76be4658-8f5f-4542-866e-de2951ec5ec3",
    "result": [
        0,
        {
            "uptime": 266871,
            "localtime": 1752087647,
            "load": [
                27104,
                38816,
                44224
            ],
            "memory": {
                "total": 253734912,
                "free": 92958720,
                "shared": 405504,
                "buffered": 8437760
            },
            "swap": {
                "total": 0,
                "free": 0
            }
        }
    ]
}

network_info_radio_state_request = [{"jsonrpc":"2.0","method":"call","id":"f3b58c0c-91d2-40f3-a020-4b349e0c0a98","params":["af85028de1f19747fc33e59b4e89d989","network.info","radio_state",{}]},{"jsonrpc":"2.0","method":"call","id":"623846f4-10fe-44df-8a18-b06bcf74e471","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","devices",{}]},{"jsonrpc":"2.0","method":"call","id":"c67c5077-6f05-4ddb-a8f9-8bf29d5e5e1e","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-iface","match":{"mode":"ap"}}]},{"jsonrpc":"2.0","method":"call","id":"cd762b7a-a964-4c9e-9746-4be7854665ff","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-iface","match":{"mode":"sta"}}]},{"jsonrpc":"2.0","method":"call","id":"a316e989-bed0-4c8d-9774-8957b2b0db2c","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"vlan","type":"vlan"}]},{"jsonrpc":"2.0","method":"call","id":"3c40b73a-c8cf-48f0-9df7-fd87edab042b","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-device"}]}]

network_info_radio_state_response = [
    {
        "jsonrpc": "2.0",
        "id": "f3b58c0c-91d2-40f3-a020-4b349e0c0a98",
        "result": [
            0,
            {
                "wifi0": {
                    "frequency": 2412,
                    "channel": 1,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi0",
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    }
                },
                "wifi1": {
                    "frequency": 5500,
                    "channel": 100,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi1",
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "623846f4-10fe-44df-8a18-b06bcf74e471",
        "result": [
            0,
            {
                "devices": [
                    "wifi1",
                    "wifi0",
                    "ath0",
                    "ath1"
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "c67c5077-6f05-4ddb-a8f9-8bf29d5e5e1e",
        "result": [
            0,
            {
                "values": {
                    "cfg023579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg023579",
                        ".index": 1,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg043579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg043579",
                        ".index": 3,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg083579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg083579",
                        ".index": 7,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    },
                    "cfg093579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg093579",
                        ".index": 8,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "cd762b7a-a964-4c9e-9746-4be7854665ff",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "a316e989-bed0-4c8d-9774-8957b2b0db2c",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "3c40b73a-c8cf-48f0-9df7-fd87edab042b",
        "result": [
            0,
            {
                "values": {
                    "wifi0": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi0",
                        ".index": 0,
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    },
                    "wifi1": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi1",
                        ".index": 2,
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    }
]

network_ghntool_ghninfo_request = [{"jsonrpc":"2.0","method":"call","id":"74be9467-ffe7-4043-a808-05b15390ac3d","params":["af85028de1f19747fc33e59b4e89d989","network.ghntool","ghninfo",{}]},{"jsonrpc":"2.0","method":"call","id":"ce3fa97e-9afb-447f-9e5f-3ad00b09fe0e","params":["af85028de1f19747fc33e59b4e89d989","network.ghntool","get_settings",{}]}]

network_ghntool_ghninfo_response = [
    {
        "jsonrpc": "2.0",
        "id": "74be9467-ffe7-4043-a808-05b15390ac3d",
        "result": [
            0,
            {
                "device_id": "3",
                "devices": [
                    {
                        "did": "1",
                        "mac": "88:FC:A6:21:81:04",
                        "rx": "589",
                        "tx": "452",
                        "role": "DOMAIN_MASTER"
                    },
                    {
                        "did": "2",
                        "mac": "88:FC:A6:13:7C:54",
                        "rx": "135",
                        "tx": "120",
                        "role": "END_POINT"
                    },
                    {
                        "did": "3",
                        "mac": "88:FC:A6:13:8F:41",
                        "role": "END_POINT"
                    },
                    {
                        "did": "4",
                        "mac": "B8:BE:F4:F2:A5:39",
                        "rx": "177",
                        "tx": "105",
                        "role": "END_POINT"
                    }
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "ce3fa97e-9afb-447f-9e5f-3ad00b09fe0e",
        "result": [
            0,
            {
                "disabled": "0",
                "state": "0",
                "domain_name": "DjN8Mm815JLgSQSsarV6WXoQXbTfgunL",
                "dm_selection_node_type": "DM_AT_GW",
                "profile": "7"
            }
        ]
    }
]

network_swconfig_list_request = {"jsonrpc":"2.0","method":"call","id":"3e8dc165-0584-4dbf-bf90-3834634ed977","params":["af85028de1f19747fc33e59b4e89d989","network.swconfig","list",{}]}

network_swconfig_list_response = {
    "jsonrpc": "2.0",
    "id": "3e8dc165-0584-4dbf-bf90-3834634ed977",
    "result": [
        0,
        {
            "switches": [
                "QCA DESS"
            ]
        }
    ]
}

network_swconfig_status_request = [{"jsonrpc":"2.0","method":"call","id":"4fe29f3f-e07c-489d-92fe-efaf90a92382","params":["af85028de1f19747fc33e59b4e89d989","network.swconfig","status",{"switch":"QCA DESS"}]}]

network_swconfig_status_response = [
    {
        "jsonrpc": "2.0",
        "id": "4fe29f3f-e07c-489d-92fe-efaf90a92382",
        "result": [
            0,
            {
                "ports": [
                    {
                        "link": true,
                        "rx_flow_control": true,
                        "tx_flow_control": true,
                        "full_duplex": true,
                        "auto_negotiation": false,
                        "speed": 1000
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    },
                    {
                        "link": true,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": true,
                        "auto_negotiation": false,
                        "speed": 1000
                    },
                    {
                        "link": false,
                        "rx_flow_control": false,
                        "tx_flow_control": false,
                        "full_duplex": false,
                        "auto_negotiation": false,
                        "speed": 0
                    }
                ]
            }
        ]
    }
]

network_info_clients_request = [{"jsonrpc":"2.0","method":"call","id":"c65f16ca-f5a2-4b38-87fa-217b7a647b50","params":["af85028de1f19747fc33e59b4e89d989","network.info","clients",{"device":"ath0"}]},{"jsonrpc":"2.0","method":"call","id":"efd39750-007a-47da-bd3c-b358e99d3d31","params":["af85028de1f19747fc33e59b4e89d989","network.info","clients",{"device":"ath1"}]}]

network_info_clients_response = [
    {
        "jsonrpc": "2.0",
        "id": "c65f16ca-f5a2-4b38-87fa-217b7a647b50",
        "result": [
            0,
            {
                "clients": {
                    "B8:D6:1A:86:CA:C0": {
                        "connected_time": 5848,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 6000
                        },
                        "tx": {
                            "rate": 43000
                        }
                    },
                    "2C:BC:BB:9F:B8:34": {
                        "connected_time": 68371,
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 52000
                        }
                    },
                    "08:B6:1F:D1:41:E8": {
                        "connected_time": 225021,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 58000
                        },
                        "tx": {
                            "rate": 57000
                        }
                    },
                    "AC:41:6A:59:0E:D7": {
                        "connected_time": 266727,
                        "rx": {
                            "rate": 65000
                        },
                        "tx": {
                            "rate": 72000
                        },
                        "ipaddr": "192.168.1.81"
                    },
                    "08:B6:1F:CF:E6:C0": {
                        "connected_time": 266732,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    },
                    "08:B6:1F:D9:07:30": {
                        "connected_time": 266732,
                        "vendor": {
                            "name": "Espressi",
                            "description": "Espressif Inc."
                        },
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    },
                    "B0:81:84:A5:3F:24": {
                        "connected_time": 266741,
                        "rx": {
                            "rate": 72000
                        },
                        "tx": {
                            "rate": 72000
                        }
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "efd39750-007a-47da-bd3c-b358e99d3d31",
        "result": [
            0,
            {
                "clients": {}
            }
        ]
    }
]

iwinfo_info_request = {"jsonrpc":"2.0","method":"call","id":"3db0def7-3823-45e3-97cd-0970439a4361","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","info",{"device":"ath0"}]}

iwinfo_info_response = {
    "jsonrpc": "2.0",
    "id": "3db0def7-3823-45e3-97cd-0970439a4361",
    "result": [
        0,
        {
            "phy": "wifi0",
            "ssid": "devolo-377",
            "bssid": "88:FC:A6:13:8F:3D",
            "mode": "Master",
            "channel": 1,
            "frequency": 2412,
            "txpower": 17,
            "quality": 0,
            "quality_max": 94,
            "signal": -99,
            "noise": -99,
            "bitrate": 192000,
            "encryption": {
                "enabled": true,
                "wpa": [
                    2
                ],
                "authentication": [
                    "psk"
                ],
                "ciphers": [
                    "ccmp"
                ]
            },
            "hwmodes": [
                "b",
                "g",
                "n"
            ],
            "hardware": {
                "name": "Generic Atheros"
            }
        }
    ]
}

iwinfo_info_request = {"jsonrpc":"2.0","method":"call","id":"5373e2f9-7437-45f2-8e23-96937ac8d710","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","info",{"device":"ath1"}]}

iwinfo_info_response = {
    "jsonrpc": "2.0",
    "id": "5373e2f9-7437-45f2-8e23-96937ac8d710",
    "result": [
        0,
        {
            "phy": "wifi1",
            "ssid": "devolo-377",
            "bssid": "88:FC:A6:13:8F:3E",
            "mode": "Master",
            "channel": 100,
            "frequency": 5500,
            "txpower": 23,
            "quality": 0,
            "quality_max": 94,
            "signal": -105,
            "noise": -105,
            "bitrate": 866700,
            "encryption": {
                "enabled": true,
                "wpa": [
                    2
                ],
                "authentication": [
                    "psk"
                ],
                "ciphers": [
                    "ccmp"
                ]
            },
            "hwmodes": [
                "ac",
                "a",
                "n"
            ],
            "hardware": {
                "name": "Generic Atheros"
            }
        }
    ]
}

system_info_request = {"jsonrpc":"2.0","method":"call","id":"3360d122-0dd0-442f-8ab2-9f63b82d08c7","params":["af85028de1f19747fc33e59b4e89d989","system","info",{}]}

system_info_response = {
    "jsonrpc": "2.0",
    "id": "3360d122-0dd0-442f-8ab2-9f63b82d08c7",
    "result": [
        0,
        {
            "uptime": 266880,
            "localtime": 1752087657,
            "load": [
                27776,
                38592,
                44096
            ],
            "memory": {
                "total": 253734912,
                "free": 93044736,
                "shared": 405504,
                "buffered": 8437760
            },
            "swap": {
                "total": 0,
                "free": 0
            }
        }
    ]
}

network_info_radio_state_request = [{"jsonrpc":"2.0","method":"call","id":"0138dd35-b364-432a-aa36-faf8731a1a82","params":["af85028de1f19747fc33e59b4e89d989","network.info","radio_state",{}]},{"jsonrpc":"2.0","method":"call","id":"e4858308-c213-4361-8034-0badbfe99057","params":["af85028de1f19747fc33e59b4e89d989","iwinfo","devices",{}]},{"jsonrpc":"2.0","method":"call","id":"73f389b8-4388-44e0-8a82-d47a63855635","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-iface","match":{"mode":"ap"}}]},{"jsonrpc":"2.0","method":"call","id":"50dce72b-df37-495a-a1e0-6d674facc57a","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-iface","match":{"mode":"sta"}}]},{"jsonrpc":"2.0","method":"call","id":"8f222eca-3a36-4f72-8cb2-bbbfc3b0a35b","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"vlan","type":"vlan"}]},{"jsonrpc":"2.0","method":"call","id":"035c0803-e257-4644-8b60-1dbb00204667","params":["af85028de1f19747fc33e59b4e89d989","uci","get",{"config":"wireless","type":"wifi-device"}]}]

network_info_radio_state_response = [
    {
        "jsonrpc": "2.0",
        "id": "0138dd35-b364-432a-aa36-faf8731a1a82",
        "result": [
            0,
            {
                "wifi0": {
                    "frequency": 2412,
                    "channel": 1,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi0",
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    }
                },
                "wifi1": {
                    "frequency": 5500,
                    "channel": 100,
                    "ssid": "devolo-377",
                    "config": {
                        "_anonymous": false,
                        "_type": "wifi-device",
                        "_name": "wifi1",
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "e4858308-c213-4361-8034-0badbfe99057",
        "result": [
            0,
            {
                "devices": [
                    "wifi1",
                    "wifi0",
                    "ath0",
                    "ath1"
                ]
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "73f389b8-4388-44e0-8a82-d47a63855635",
        "result": [
            0,
            {
                "values": {
                    "cfg023579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg023579",
                        ".index": 1,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg043579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg043579",
                        ".index": 3,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "wds": "1",
                        "encryption": "psk2",
                        "ieee80211w": "1",
                        "wps_config": "push_button virtual_push_button physical_push_button display virtual_display",
                        "dvl_main": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "rsn_preauth": "1",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "ssid": "devolo-377",
                        "key": "AEQTNPSHFTVQKWDO",
                        "disabled": "0",
                        "MapBSSType": "96"
                    },
                    "cfg083579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg083579",
                        ".index": 7,
                        "device": "wifi0",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    },
                    "cfg093579": {
                        ".anonymous": true,
                        ".type": "wifi-iface",
                        ".name": "cfg093579",
                        ".index": 8,
                        "device": "wifi1",
                        "network": "lan",
                        "mode": "ap",
                        "encryption": "psk2",
                        "dvl_guest": "1",
                        "disabled": "1",
                        "rrm": "1",
                        "wnm": "1",
                        "ieee80211r": "0",
                        "atfssidsched": "0",
                        "uapsd": "1",
                        "wsplcd_unmanaged": "1",
                        "ssid": "devolo-guest-377",
                        "key": "AEQTNPSH"
                    }
                }
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "50dce72b-df37-495a-a1e0-6d674facc57a",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "8f222eca-3a36-4f72-8cb2-bbbfc3b0a35b",
        "result": [
            0,
            {
                "values": {}
            }
        ]
    },
    {
        "jsonrpc": "2.0",
        "id": "035c0803-e257-4644-8b60-1dbb00204667",
        "result": [
            0,
            {
                "values": {
                    "wifi0": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi0",
                        ".index": 0,
                        "channel": "auto",
                        "txpower": "20",
                        "htmode": "HT40",
                        "hwmode": "11g",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "11000",
                            "9000",
                            "6000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "basic_rate": [
                            "11000",
                            "5500",
                            "2000",
                            "1000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "type": "qcawificfg80211",
                        "preamble": "1",
                        "country": "FR",
                        "disabled": "0"
                    },
                    "wifi1": {
                        ".anonymous": false,
                        ".type": "wifi-device",
                        ".name": "wifi1",
                        ".index": 2,
                        "channel": "auto",
                        "txpower": "27",
                        "htmode": "VHT80",
                        "hwmode": "11a",
                        "autorescan": "1",
                        "autorescan_interval": "120",
                        "set_fw_recovery": "1",
                        "supported_rates": [
                            "54000",
                            "48000",
                            "36000",
                            "24000",
                            "18000",
                            "12000",
                            "9000",
                            "6000"
                        ],
                        "basic_rate": [
                            "24000",
                            "12000",
                            "6000"
                        ],
                        "atfstrictsched": "0",
                        "atfobsssched": "1",
                        "acs_chanlist": [
                            "36-112",
                            "132-140"
                        ],
                        "type": "qcawificfg80211",
                        "country": "FR",
                        "disabled": "0"
                    }
                }
            }
        ]
    }
]

system_info_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"5029fdc1-f8db-4987-9d1c-bd55f672fe5e",
    "params":[
        "8f99c3a2c17b39011d75fff3c3644296",
        "system",
        "info",
        {}
    ]
}

system_info_response = {
    "jsonrpc": "2.0",
    "id": "5029fdc1-f8db-4987-9d1c-bd55f672fe5e",
    "result": [
        0,
        {
            "uptime": 271683,
            "localtime": 1752092460,
            "load": [
                54880,
                51808,
                50464
            ],
            "memory": {
                "total": 253734912,
                "free": 92712960,
                "shared": 405504,
                "buffered": 8437760
            },
            "swap": {
                "total": 0,
                "free": 0
            }
        }
    ]
}

iwinfo_info_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"3982e02f-286b-4e7f-b7ca-b81fb1ae56a1",
    "params":[
        "8f99c3a2c17b39011d75fff3c3644296",
        "iwinfo",
        "info",
        {"device":"ath1"}
    ]
}

iwinfo_info_response = {
    "jsonrpc": "2.0",
    "id": "3982e02f-286b-4e7f-b7ca-b81fb1ae56a1",
    "result": [
        0,
        {
            "phy": "wifi1",
            "ssid": "devolo-377",
            "bssid": "88:FC:A6:13:8F:3E",
            "mode": "Master",
            "channel": 100,
            "frequency": 5500,
            "txpower": 23,
            "quality": 0,
            "quality_max": 94,
            "signal": -105,
            "noise": -105,
            "bitrate": 866700,
            "encryption": {
                "enabled": true,
                "wpa": [
                    2
                ],
                "authentication": [
                    "psk"
                ],
                "ciphers": [
                    "ccmp"
                ]
            },
            "hwmodes": [
                "ac",
                "a",
                "n"
            ],
            "hardware": {
                "name": "Generic Atheros"
            }
        }
    ]
}


session_refresh_request = {
    "jsonrpc":"2.0",
    "method":"call",
    "id":"0940a882-06f8-4510-91ef-45efbdfec280",
    "params":[
        "8f99c3a2c17b39011d75fff3c3644296",
        "session",
        "refresh",
        {}
    ]
}

session_refresh_response = {
    "jsonrpc":"2.0",
    "id":"0940a882-06f8-4510-91ef-45efbdfec280",
    "result":[0]
}