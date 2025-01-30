{pkgs}: {
  deps = [
    pkgs.ntp
    pkgs.openssh
    pkgs.openafs
    pkgs.unixtools.ping
  ];
}
