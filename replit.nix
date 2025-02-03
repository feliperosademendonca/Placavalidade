{pkgs}: {
  deps = [
    pkgs.lsof
    pkgs.ntp
    pkgs.openssh
    pkgs.openafs
    pkgs.unixtools.ping
  ];
}
