package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func main() {
	rootCmd := &cobra.Command{
		Use:   "purple",
		Short: "Tunnel your local server to the public Internet",
		Long:  `Purple is a lightweight tunneling tool for exposing local ports through a secure public URL.`,
	}

	rootCmd.AddCommand(exposeCmd)
	rootCmd.AddCommand(statusCmd)
	rootCmd.AddCommand(stopCmd)

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

var exposeCmd = &cobra.Command{
	Use:   "expose [port]",
	Short: "Expose a local port to the public Internet",
	Long:  `Expose a local port to the public Internet. The port must be accessible from the local machine.`,
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Exposing port", args[0])
	},
}

var statusCmd = &cobra.Command{
	Use:   "status",
	Short: "Check the status of the current tunnel",
	Long:  `Check the status of the current tunnel. If no tunnel is active, this command will return an error.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Checking tunnel status")
	},
}

var stopCmd = &cobra.Command{
	Use:   "stop",
	Short: "Stop the active tunnel",
	Long:  `Stop the active tunnel. If no tunnel is active, this command will return an error.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Stopping tunnel")
	},
}
